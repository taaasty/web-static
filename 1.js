     if (window.getSelection && document.createRange) {
            range = document.createRange();
            range.selectNodeContents(div);
            range.collapse(true);
            sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
        } else if (document.body.createTextRange) {
            range = document.body.createTextRange();
            range.moveToElementText(div);
            range.collapse(true);
            range.select();
        }
