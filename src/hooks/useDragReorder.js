import { useState, useRef, useCallback } from 'react';

/**
 * Custom hook for HTML5 drag-and-drop reordering.
 * Returns drag event handlers and state for styling.
 *
 * @param {Array} items - The array of items
 * @param {Function} setItems - Setter to update the array
 * @returns {{ dragHandlers, dragOverIndex }}
 */
export function useDragReorder(items, setItems) {
    const [dragOverIndex, setDragOverIndex] = useState(null);
    const dragIndexRef = useRef(null);

    const handleDragStart = useCallback((index) => {
        dragIndexRef.current = index;
    }, []);

    const handleDragOver = useCallback((e, index) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        if (dragOverIndex !== index) {
            setDragOverIndex(index);
        }
    }, [dragOverIndex]);

    const handleDrop = useCallback((e, dropIndex) => {
        e.preventDefault();
        const dragIndex = dragIndexRef.current;
        if (dragIndex === null || dragIndex === dropIndex) {
            setDragOverIndex(null);
            return;
        }

        const updated = [...items];
        const [moved] = updated.splice(dragIndex, 1);
        updated.splice(dropIndex, 0, moved);
        setItems(updated);
        setDragOverIndex(null);
        dragIndexRef.current = null;
    }, [items, setItems]);

    const handleDragEnd = useCallback(() => {
        setDragOverIndex(null);
        dragIndexRef.current = null;
    }, []);

    const getDragProps = useCallback((index) => ({
        draggable: true,
        onDragStart: () => handleDragStart(index),
        onDragOver: (e) => handleDragOver(e, index),
        onDrop: (e) => handleDrop(e, index),
        onDragEnd: handleDragEnd,
    }), [handleDragStart, handleDragOver, handleDrop, handleDragEnd]);

    return { getDragProps, dragOverIndex };
}
