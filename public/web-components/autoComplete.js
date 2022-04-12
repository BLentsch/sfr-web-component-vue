const template = document.createElement('template');
template.innerHTML = `
    <style>
        ul {
            list-style-type: none;
            padding: 0;
        }
        ul li {
            padding: 8px 16px;
            border: 1px solid #ddd;
            background: #fff;
            cursor: pointer;
        }
    </style>
    <div id="autocomplete" style="margin: auto;">
        <input type="text" id="textInput" style="width: 100%"/>
        <div id="suggestions" style="color: black; width: 100%; height: 250px; overflow: auto;"></div>
    </div>
    `;

class AutoComplete extends HTMLElement {
    constructor() {
        super();

        this.elemString = this.getAttribute("data");
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        this.shadowRoot.querySelector('#textInput').addEventListener('input', (e) => this.showResults(e));
        this.shadowRoot.querySelector('#textInput').addEventListener('blur', (e) => console.log(e.target.value));
    }

    disconnectedCallback() {
        this.shadowRoot.querySelector('#textInput').removeEventListener();
    }

    static get observedAttributes() {
        return ["data"];
    }

    attributeChangedCallback(prop) {
        if (prop === "data") {
            this.elemString = this.getAttribute("data");
            this.listOfElems = this.elemString.split(',');
            this.showResults();
        }
    }

    selectItem(val) {
        var selectedItem = val.target.innerHTML;
        this.shadowRoot.getElementById("textInput").value = selectedItem;
        this.shadowRoot.getElementById("suggestions").setAttribute('style', 'display: none');
    }

    autocompleteMatch(input) {
        if (input == '') {
            return [];
        }
        var reg = new RegExp(input)
        return this.listOfElems.filter(function(term) {
            if (term.match(reg)) {
              return term;
            }
        });
      }
       
    showResults(val) {
        if(this.shadowRoot.getElementById("suggestions").style.display === 'none') {
            this.shadowRoot.getElementById("suggestions").setAttribute('style', 'display: block');
        }

        if(val) {
            var res = this.shadowRoot.getElementById("suggestions");
            res.innerHTML = '';
            let list = '';
            let terms = this.autocompleteMatch(val.target.value);
            for (var i=0; i<terms.length; i++) {
                list += '<li class="list-elem">' + terms[i] + '</li>';
            }

            res.innerHTML = '<ul class="list-all">' + list + '</ul>';
            var suggElem = this.shadowRoot.querySelectorAll('.list-elem');
            suggElem.forEach(suggElem => {
                suggElem.addEventListener('click', (e) => {
                    this.selectItem(e);
                });
                suggElem.addEventListener('mouseover', (e) => {
                    e.target.setAttribute('style', 'background: #b9b9b9');
                });
                suggElem.addEventListener('mouseout', (e) => {
                    e.target.setAttribute('style', 'background: #fff');
                });
            });
        }
    }
}

window.customElements.define('auto-complete', AutoComplete);