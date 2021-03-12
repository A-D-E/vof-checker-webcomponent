const template = document.createElement('template')
let loading = false, checkedDown = false, hasError = false
template.innerHTML = `
<style>

.loader,.loader:before,.loader:after{
    display: none;
    box-sizing: border-box;
    flex-grow: 0;
    flex-shrink: 0;
}
.loader.awesome-spin {
    border-radius: 50%;
    color: var(--bs-primary, #33f);
    border-top: solid 2px;
    border-bottom: solid 2px;
    width: 20px;
    height: 20px;
    animation: awesome-spin 2s  linear infinite;
  }
  
  @keyframes awesome-spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
</style>
    <div id="vof-checker__root" class="vof-checker__root">
        <form id="vof-checker__form" class="vof-checker__form">
            <label for="vof-checker__input" id="vof-checker__label" class="vof-checker__label"></label>
            <input id="vof-checker__input" class="vof-checker__input" type="text" />
            <button id="vof-checker__button" class="vof-checker__button"></button>
        </form>
        <div id="vof-checker__feedback" class="vof-checker__feedback"></div>
        <div class="loader awesome-spin"></div>
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
        loading
          ? (this.shadowRoot.querySelector('.loader').style.display =
              'inline-flex')
          : (this.shadowRoot.querySelector('.loader').style.display =
              'none')
    }

    async checkDomain(value){
        loading = true
        const isRaMicro = this.getAttribute('isRaMicro') === "ja"
        const partnerId = this.getAttribute('partnerId') !== ""

        const headers = new Headers()
        headers.append('Content-Type', 'application/json')
        headers.append('Accept', 'application/json')
        
        const resData = await fetch(
          `https://${value}${
              isRaMicro ?
              '.ra-micro.voffice.pro' :
              '.voffice.pro'
            }/api/namespaceExists`,
          {
            headers: headers,
          }
        )
          .then((data) => data.json())
          .then((res) => {
              loading = false
              checkedDown = true
              console.log(res)
          })
          .catch((error) => {
              hasError = true
              loading = false
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