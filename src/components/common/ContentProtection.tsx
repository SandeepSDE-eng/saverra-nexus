import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";

export function ContentProtection() {
  const routerState = useRouterState();
  const isAdminOrAuth = routerState.location.pathname.startsWith("/admin") || routerState.location.pathname.startsWith("/auth");

  useEffect(() => {
    // If inside admin or auth routes, allow normal developer/admin copy-paste
    if (isAdminOrAuth) return;

    // 1. Disable Right Click Context Menu on public pages (allow inputs/textareas)
    const handleContextMenu = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable) {
        return;
      }
      e.preventDefault();
    };

    // 2. Disable Image Dragging
    const handleDragStart = (e: DragEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "IMG" || target.closest("img")) {
        e.preventDefault();
      }
    };

    // 3. Disable Shortcuts (Ctrl+C on non-inputs, Ctrl+U view source, Ctrl+Shift+I inspect, F12 inspect)
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const isInput = target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable;

      // F12 or DevTools shortcuts
      if (
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "i" || e.key === "J" || e.key === "j" || e.key === "C" || e.key === "c")) ||
        (e.ctrlKey && (e.key === "U" || e.key === "u" || e.key === "S" || e.key === "s"))
      ) {
        e.preventDefault();
        return false;
      }

      // Copy shortcut (Ctrl+C) outside input fields
      if (!isInput && e.ctrlKey && (e.key === "c" || e.key === "C" || e.key === "x" || e.key === "X")) {
        e.preventDefault();
        return false;
      }
    };

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("dragstart", handleDragStart);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("dragstart", handleDragStart);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isAdminOrAuth]);

  return null;
}
