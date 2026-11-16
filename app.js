/* Shared interface behavior */
'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('creatorToggle');
    const panel = document.getElementById('creatorPanel');

    if (toggle && panel) {
        toggle.addEventListener('click', () => {
            const opening = panel.hidden;
            panel.hidden = !opening;
            toggle.setAttribute('aria-expanded', String(opening));
            toggle.textContent = opening ? 'Hide Creator Information' : 'Meet the Creators';
        });
    }

    const quizForm = document.querySelector('[data-confirm-submit="true"]');
    if (quizForm) {
        quizForm.addEventListener('submit', (event) => {
            if (!window.confirm('Submit your answers? You cannot change them after submission.')) {
                event.preventDefault();
            }
        });
    }

    const resetDialog = document.getElementById('resetTestDialog');
    if (resetDialog && typeof resetDialog.showModal === 'function') {
        const resetUserId = document.getElementById('resetUserId');
        const resetDialogUser = document.getElementById('resetDialogUser');
        const cancelButton = resetDialog.querySelector('[data-reset-cancel]');

        document.querySelectorAll('[data-reset-test]').forEach((button) => {
            button.addEventListener('click', () => {
                resetUserId.value = button.dataset.userId;
                resetDialogUser.textContent = button.dataset.userName;
                resetDialog.showModal();
            });
        });

        cancelButton.addEventListener('click', () => resetDialog.close());
    }
});
