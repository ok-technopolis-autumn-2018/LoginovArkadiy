import '../styles/default.scss';

console.log('init');


document.addEventListener("DOMContentLoaded", function () {
    let input = document.querySelector('.todo-creator_text-input');
    let list = document.querySelector('.todos-list');
    let buttonClear = document.querySelector('.todos-toolbar_clear-completed');
    let filters = document.querySelectorAll('.filters-item');
    var filter = 1;
    let itemsChecked = [
        {
            checked: true,
            text: "HTML"
        },
        {
            checked: true,
            text: "CSS",
        },
        {
            checked: false,
            text: "JS"
        },
        {
            checked: true,
            text: "SASS"
        }
    ];
    initialization();

    function redraw() {
        var unreadyCounter = 0;
        list.innerHTML = '';
        for (let i = 1; i < 4; i++) {
            document.getElementById("filter" + i).checked = filter === i;
        }
        for (let i = 0; i < itemsChecked.length; i++) {
            if (filter === 1 || filter === 2 && !itemsChecked[i].checked || filter === 3 && itemsChecked[i].checked) {
                addItem(itemsChecked[i].text, itemsChecked[i].checked);
            }
            if (!itemsChecked[i].checked) {
                unreadyCounter++;
            }
        }
        if(unreadyCounter === 0){
            unreadyCounter ='none'
        }
        if(unreadyCounter === itemsChecked.length){
            unreadyCounter ='All'
        }
        document.querySelector('.todos-toolbar_unready-counter').innerHTML = unreadyCounter + ' items left';
    }


    function initialization() {
        for (let i = 0; i < itemsChecked.length; i++) {
            addItem(itemsChecked[i].text, itemsChecked[i].checked)
        }
        filters[0].addEventListener(
                "click",
                function () {
                    filter = 1;
                    redraw();
                });
        filters[1].addEventListener(
                "click",
                function () {
                    filter = 2;
                    redraw();
                });
        filters[2].addEventListener(
                "click",
                function () {
                    filter = 3;
                    redraw();
                });
        redraw();
    }

    function addItem(text, checked) {
        var s = '';
        if (checked) {
            s = "checked";
        }
        list.insertAdjacentHTML(
                "beforeend",
                ' <div class="todos-list_item">' +
                '<div class="custom-checkbox todos-list_item_ready-marker">' +
                ' <input type="checkbox"' +
                s +
                ' class="custom-checkbox_target" aria-label="Mark todo as ready" />' +
                '<div class="custom-checkbox_visual">' +
                ' <div class="custom-checkbox_visual_icon"></div>' +
                '</div> </div>' +
                ' <button class="todos-list_item_remove" aria-label="Delete todo"></button>\n' +
                '<div class="todos-list_item_text-w">\n' +
                '<textarea readonly class="todos-list_item_text">' +
                text +
                '</textarea> </div> </div>'
        );

        if (checked) {
            let items = list.querySelectorAll('.todos-list_item');
            var textItem = items[items.length - 1].querySelector('.todos-list_item_text');
            textItem.style.color = 'grey';
            textItem.style.textDecoration = 'line-through';
        }


        var removeItems = list.querySelectorAll('.todos-list_item_remove');
        removeItems[removeItems.length - 1].addEventListener(
                "click",
                function (e) {
                    e.preventDefault();
                    var item = this.closest('.todos-list_item');
                    var textItem = item.querySelector('.todos-list_item_text');
                    removeByText(textItem.value.trim());
                    list.removeChild(item);
                }
        );

        var checkBoxItems = list.querySelectorAll('.custom-checkbox_target');
        checkBoxItems[checkBoxItems.length - 1].addEventListener(
                "click",
                function (e) {
                    e.preventDefault();
                    let item = this.closest('.todos-list_item');
                    let textItem = item.querySelector('.todos-list_item_text');
                    changeChecked(textItem.value);
                    redraw();
                }
        );
    }

    input.addEventListener("keydown", function (e) {
        if (e.keyCode === 13) {
            e.preventDefault();
            var text = input.value.trim();
            if (text.length > 0) {
                input.value = "";
                itemsChecked[itemsChecked.length] = {text: text, checked: false};
                addItem(text, false);
                redraw();

            }
        }
    });

    function removeByText(s) {
        for (let i = 0; i < itemsChecked.length; i++) {
            if (itemsChecked[i].text === s) {
                itemsChecked.splice(i, 1);
                return;
            }
        }
    }

    function changeChecked(s) {
        for (let i = 0; i < itemsChecked.length; i++) {
            if (itemsChecked[i].text === s) {
                itemsChecked[i].checked = !itemsChecked[i].checked;
                return itemsChecked[i].checked;
            }
        }
        return true;
    }

    buttonClear.addEventListener(
            "click",
            function (e) {
                e.preventDefault();
                for (let i = 0; i < itemsChecked.length; i++) {
                    if (itemsChecked[i].checked) {
                        itemsChecked.splice(i, 1);
                        i--;
                    }
                }
                redraw();
            }
    )

})
;