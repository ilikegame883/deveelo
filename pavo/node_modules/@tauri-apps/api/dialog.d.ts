/** Extension filters for the file dialog. */
interface DialogFilter {
    /** Filter name. */
    name: string;
    /**
     * Extensions to filter, without a `.` prefix.
     * @example
     * ```typescript
     * extensions: ['svg', 'png']
     * ```
     */
    extensions: string[];
}
/** Options for the open dialog. */
interface OpenDialogOptions {
    /** The filters of the dialog. */
    filters?: DialogFilter[];
    /** Initial directory or file path. It must exist. */
    defaultPath?: string;
    /** Whether the dialog allows multiple selection or not. */
    multiple?: boolean;
    /** Whether the dialog is a directory selection or not. */
    directory?: boolean;
}
/** Options for the save dialog. */
interface SaveDialogOptions {
    /** The filters of the dialog. */
    filters?: DialogFilter[];
    /**
     * Initial directory or file path.
     * If it's a directory path, the dialog interface will change to that folder.
     * If it's not an existing directory, the file name will be set to the dialog's file name input and the dialog will be set to the parent folder.
     */
    defaultPath?: string;
}
/**
 * Open a file/directory selection dialog
 *
 * @returns A promise resolving to the selected path(s)
 */
declare function open(options?: OpenDialogOptions): Promise<string | string[]>;
/**
 * Open a file/directory save dialog.
 *
 * @returns A promise resolving to the selected path.
 */
declare function save(options?: SaveDialogOptions): Promise<string>;
export type { DialogFilter, OpenDialogOptions, SaveDialogOptions };
export { open, save };
