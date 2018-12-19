import '../styles/default.scss';

console.log('init');


var elem = document.querySelector(".main-layout")
elem.style.backgroundColor = "#fff";

document.addEventListener("DOMContentLoaded", function () {
    var input = document.querySelector('.todo-creator_text-input');
    var list = document.querySelector('.todos-list');
    function addItem(text) {
        list.insertAdjacentHTML(
                "beforeend",
                ' <div class="todos-list_item">' +
                '<div class="custom-checkbox todos-list_item_ready-marker">' +
                ' <input type="checkbox" class="custom-checkbox_target" aria-label="Mark todo as ready" />' +
                '<div class="custom-checkbox_visual">' +
                ' <div class="custom-checkbox_visual_icon"></div>' +
                '</div> </div>' +
                ' <button class="todos-list_item_remove" aria-label="Delete todo"></button>\n' +
                '<div class="todos-list_item_text-w">\n' +
                '<textarea readonly class="todos-list_item_text">' +
                text +
                '</textarea> </div> </div> <hr/>'
        );


        var removeItems = list.querySelector('.todos-list_item_remove');
        removeItems[removeItems.length - 1].addEventListener(
                "click",
                function (e) {
                   // e.preventDefault();
                    alert("УДалить");
                  //  var item = this.closest('.todos-list_item')
                 //   list.removeChild(item);

                }
        )

        var checkBoxItems = list.querySelector('.custom-checkbox_target');
        checkBoxItems[checkBoxItems.length - 1].addEventListener(
                "click",
                function (e) {
                    //e.preventDefault();
                    var item = this.closest('.todos-list_item');
                    item.className = '.todos-list_item __completed';
                    alert("Ченку");
                }
    )



    }

    input.addEventListener("keydown", function (e) {
        if (e.keyCode === 13) {
            e.preventDefault();
            var text = input.value.trim();
            if (text.length > 0) {
                input.value = "";
                addItem(text);
            }
        }
    });
});