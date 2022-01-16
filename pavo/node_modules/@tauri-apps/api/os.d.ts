/**
 * The operating system-specific end-of-line marker.
 * - `\n` on POSIX
 * - `\r\n` on Windows
 * */
declare const EOL: string;
/**
 * Returns a string identifying the operating system platform.
 * The value is set at compile time. Possible values are `'aix'`, `'darwin'`, `'freebsd'`, `'linux'`, `'openbsd'`, `'sunos'`, and `'win32'`.
 */
declare function platform(): Promise<string>;
/**
 * Returns a string identifying the kernel version.
 */
declare function version(): Promise<string>;
/**
 * Returns `'Linux'` on Linux, `'Darwin'` on macOS, and `'Windows_NT'` on Windows.
 */
declare function type(): Promise<string>;
/**
 * Returns the operating system CPU architecture for which the tauri app was compiled. Possible values are `'x86'`, `'x86_64'`, `'arm'`, `'aarch64'`, `'mips'`, `'mips64'`, `'powerpc'`, `'powerpc64'`, `'riscv64'`, `'s390x'`, `'sparc64'`
 */
declare function arch(): Promise<string>;
/**
 * Returns the operating system's default directory for temporary files as a string.
 */
declare function tempdir(): Promise<string>;
export { EOL, platform, version, type, arch, tempdir };
