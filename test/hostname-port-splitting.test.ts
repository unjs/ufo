import { describe, it, expect } from 'vitest';

/**
 * Isolated unit tests for URL host and port extraction edge cases.
 */

function splitHostAndPort(hostWithPort: string): { host: string; port: number | null } {
  if (!hostWithPort) return { host: '', port: null };
  const trimmed = hostWithPort.trim();
  
  // Handle IPv6 bracket format
  if (trimmed.startsWith('[')) {
    const closeBracket = trimmed.indexOf(']');
    if (closeBracket !== -1) {
      const host = trimmed.slice(1, closeBracket);
      const remainder = trimmed.slice(closeBracket + 1);
      const port = remainder.startsWith(':') ? parseInt(remainder.slice(1), 10) : null;
      return { host, port: isNaN(port as number) ? null : port };
    }
  }

  const parts = trimmed.split(':');
  if (parts.length === 2 && !isNaN(Number(parts[1]))) {
    return { host: parts[0], port: parseInt(parts[1], 10) };
  }
  return { host: trimmed, port: null };
}

describe('Host and Port Splitting Utility', () => {
  it('should parse standard host:port combinations', () => {
    expect(splitHostAndPort('api.example.com:8080')).toEqual({ host: 'api.example.com', port: 8080 });
    expect(splitHostAndPort('localhost:3000')).toEqual({ host: 'localhost', port: 3000 });
  });

  it('should parse IPv6 hosts with bracketed ports', () => {
    expect(splitHostAndPort('[::1]:9000')).toEqual({ host: '::1', port: 9000 });
    expect(splitHostAndPort('[fe80::1]')).toEqual({ host: 'fe80::1', port: null });
  });

  it('should handle hosts without ports', () => {
    expect(splitHostAndPort('example.com')).toEqual({ host: 'example.com', port: null });
    expect(splitHostAndPort('')).toEqual({ host: '', port: null });
  });
});
