import { Tooltip, Typography, type TooltipProps } from "@mui/material";
import { getModShortcutKey } from "../../utils/platform";

export type RichTextEditorMenuButtonTooltipProps = {
  /**
   * Used to display what this button is responsible for. Ex: "Ordered list".
   */
  label: string;
  /**
   * An array representing the set of keys that should be pressed to trigger
   * this action (for its keyboard shortcut), so that this can be displayed to
   * the user. If empty, no keyboard shortcut is displayed.
   *
   * Use the literal string "mod" to represent Cmd on Mac and Ctrl on Windows
   * and Linux.
   *
   * Example: ["mod", "Shift", "7"] is the array that should be provided as the
   * combination for toggling an ordered list.
   *
   * For the list of pre-configured Tiptap shortcuts, see
   * https://tiptap.dev/api/keyboard-shortcuts.
   */
  shortcutKeys?: string[];
  /** Where the tooltip should be placed. By default "top" (above). */
  placement?: TooltipProps["placement"];
  /**
   * Class applied to the element that contains the children content. We add an
   * intermediary element since Tooltip requires a non-disabled child element in
   * order to render, and we want to allow tooltips to show up even when buttons
   * are disabled.
   */
  contentWrapperClassName?: string;
  /** The menu element for which we're showing a tooltip when hovering. */
  children: React.ReactNode;
} & Pick<TooltipProps, "open" | "onOpen" | "onClose">;

export default function RichTextEditorMenuButtonTooltip({
  label,
  shortcutKeys,
  placement = "top",
  contentWrapperClassName,
  children,
  ...otherTooltipProps
}: RichTextEditorMenuButtonTooltipProps) {
  return (
    <Tooltip
      title={
        label || (shortcutKeys && shortcutKeys.length > 0) ? (
          <div>
            <div className="text-center">{label}</div>

            {shortcutKeys && shortcutKeys.length > 0 && (
              <Typography className="space-x-2" variant="body2" component="div">
                {shortcutKeys.map((shortcutKey, index) => (
                  <span key={index}>
                    {shortcutKey === "mod" ? getModShortcutKey() : shortcutKey}
                  </span>
                ))}
              </Typography>
            )}
          </div>
        ) : (
          ""
        )
      }
      placement={placement}
      arrow
      {...otherTooltipProps}
    >
      {/* Use a span around the children so we show a tooltip even if the
      element inside is disabled */}
      <span className={contentWrapperClassName}>{children}</span>
    </Tooltip>
  );
}