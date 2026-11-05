import React from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';

export const DeleteConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  taskTitle = '',
  isDeleting = false
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md animate-fade-in">
      <div 
        className="w-full max-w-md bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 text-center">
          <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-4 shadow-xs border border-rose-200">
            <AlertTriangle size={28} />
          </div>

          <h3 className="text-lg font-black text-slate-900 mb-1">
            Delete Task?
          </h3>

          <p className="text-xs sm:text-sm text-slate-500 mb-4 px-2">
            Are you sure you want to permanently clear this objective from your cloud stream?
          </p>

          {taskTitle && (
            <div className="p-3 bg-cloud-100 rounded-2xl border border-cloud-200/80 text-xs font-semibold text-slate-800 mb-6 italic break-words shadow-xs">
              "{taskTitle}"
            </div>
          )}

          <div className="flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isDeleting}
              className="w-1/2 py-2.5 rounded-2xl border border-cloud-300 hover:bg-cloud-50 text-sm font-semibold text-slate-700 transition-colors"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={onConfirm}
              disabled={isDeleting}
              className="w-1/2 py-2.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white text-sm font-bold shadow-md hover:shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              {isDeleting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Deleting...</span>
                </>
              ) : (
                <>
                  <Trash2 size={15} />
                  <span>Delete Task</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
