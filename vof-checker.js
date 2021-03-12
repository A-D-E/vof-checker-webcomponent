const template = document.createElement('template')
template.innerHTML = `
    <style>
       
    </style>
    <div id="vof-checker__root">
        <form id="vof-checker__form">
            <label for="vof-checker__input" id="vof-checker__label"></label>
            <input id=""vof-checker__input" type="text" />
            <button id="vof-checker__button"></button>
        </form>
        <div id="vof-checker__feedback"></div>
    </div>
`

class VofChecker extends HTMLElement {
    constructor(){
        super()
        this.attachShadow({ mode: "open"})
        this.shadowRoot.appendChild(template.content.cloneNode(true))
        this.shadowRoot.querySelector('#vof-checker__button').innerText = this.getAttribute('btnText')
        this.shadowRoot.querySelector('#vof-checker__label').innerText = this.getAttribute('labelText')
        this.shadowRoot.querySelector('#vof-checker__feedback').innerText = this.getAttribute('feedbackText')

        this.getAttribute('rootClass') ?? this.shadowRoot.querySelector('#vof-checker__root').setAttribute('class', this.getAttribute('rootClass'))
        this.getAttribute('formClass') ?? this.shadowRoot.querySelector('#vof-checker__form').setAttribute('class', this.getAttribute('formClass'))
        this.getAttribute('inputClass') ?? this.shadowRoot.querySelector('#vof-checker__input').setAttribute('class', this.getAttribute('inputClass'))
        this.getAttribute('btnClass') ?? this.shadowRoot.querySelector('#vof-checker__button').setAttribute('class', this.getAttribute('btnClass'))
        
    }

    async checkDomain(value){
        const headers = new Headers()
        headers.append('Content-Type', 'application/json')
        headers.append('Accept', 'application/json')
        const resData = await fetch(
          `https://${value}${'.voffice.pro'}/api/namespaceExists`,
          {
            headers: headers,
          }
        )
          .then((data) => data.json())
          .then((res) => console.log(res))
          .catch((error) => {
            return console.error('Error', error)
          })
    }
    connectedCallback(){
        let value
        this.shadowRoot.querySelector('input').addEventListener('input', (e) => {
           value = e.target.value
        })
        this.shadowRoot.querySelector('button').addEventListener('click', (e)=> {
            e.preventDefault()
            this.checkDomain(value)
        })
    }

}

window.customElements.define('vof-checker', VofChecker)