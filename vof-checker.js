const template = document.createElement('template')
template.innerHTML = `
<style>
@import url('https://fonts.googleapis.com/css2?family=Gudea&display=swap');

.vof-checker__form {
  display: flex;
  align-items: center;
  font-family: Gudea,Roboto,"Helvetica Neue",Arial,sans-serif;
}

.vof-checker__inputwrap {
    position: relative;
    flex-basis: 30%;
    margin-right: 2rem;
}

.vof-checker__button, .vof-checker__setup-button {
  display: flex;
  align-items: center;
  color: #01879d;
  border: 1px solid rgba(1, 135, 157, 0.5);
  min-width: 64px;
  box-sizing: border-box;
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  font-family: Gudea,Roboto,"Helvetica Neue",Arial,sans-serif;
  font-weight: 500;
  text-transform: uppercase;
  line-height: 1.75;
  border-radius: 4px;
  cursor:pointer;
  padding: 7px 21px;
  font-size: 0.8333333333333334rem;
  letter-spacing: .5px;
  transition: all .3s ease-in-out;
  margin-right: 1rem;
}

.vof-checker__button:focus, .vof-checker__setup-button:focus {
   outline: none;
}

.vof-checker__button:hover, .vof-checker__setup-button:hover {
  border: 1px solid #01879d;
  background-color: rgba(1, 135, 157, 0.04);
}

.vof-checker__button.disabled, .vof-checker__setup-button.disabled {
  border: 1px solid rgba(0, 0, 0, 0.12);
  color: rgba(0, 0, 0, 0.26);
  cursor: default;
  pointer-events: none;
}
.vof-checker__input {
  width: 100%;
  font: inherit;
  color: #000;
  border: 0;
  height: 1.1876em;
  margin: 0;
  display: inline-block;
  padding: 6px 0 7px;
  min-width: 0;
  background: none;
  box-sizing: content-box;
  animation-name: mui-auto-fill-cancel;
  letter-spacing: inherit;
  animation-duration: 10ms;
  border-bottom: solid thin rgb(1, 135, 157);
  margin: 0 1rem;
  -webkit-tap-highlight-color: transparent;
}
.vof-checker__input:active, .vof-checker__input:focus {
  border: none;
  outline: none;
  border-bottom: solid thin rgb(1, 135, 157);
}
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
    margin-left: 1rem;
  }
  
 .vof-checker__chip-success {
    position: absolute;
    right: 0;
    top: 0;
    font-size: 0.75rem;
    padding: 2px 25px 2px 0;
    line-height: 24px;
    border: solid thin green;
    border-radius: 20px;
    color: green;
  }
  .vof-checker__chip-error {
    position: absolute;
    right: 0;
    top: 0;
    font-size: 0.75rem;
    padding: 2px 25px 2px 0;
    line-height: 24px;
    border: solid thin red;
    border-radius: 20px;
    color: red;
  }

  .vof-checker__chip-success-icon {
    border: solid thin green;
    border-radius: 50%;
    padding: 3px 5px;
    margin: 3px 5px 3px 3px;
    color: green;
    font-wight: bold;
  }

  .vof-checker__chip-error-icon {
    border: solid thin red;
    border-radius: 50%;
    padding: 3px 5px;
    margin: 3px 5px 3px 3px;
    color: red;
    font-wight: bold;
  }

  .vof-checker__chip-error.hide, .vof-checker__chip-success.hide{
    display: none
  }

  @keyframes awesome-spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
</style>
    <div id="vof-checker__root" class="vof-checker__root">
        <form id="vof-checker__form" class="vof-checker__form">
            <label for="vof-checker__input" id="vof-checker__label" class="vof-checker__label"><slot name="label"></slot></label>
            <div class="vof-checker__inputwrap">
            <input id="vof-checker__input" class="vof-checker__input" type="text" />
            <span id="vof-checker__chip-error" class="vof-checker__chip-error hide"><span class="vof-checker__chip-error-icon">&#10006;</span><slot name="chip-error"></slot></span>
            <span id="vof-checker__chip-success" class="vof-checker__chip-success hide"><span class="vof-checker__chip-success-icon">&#10004;</span><slot name="chip-success"></slot></span>
            </div>
            <button id="vof-checker__button" class="vof-checker__button disabled"><slot name="button"></slot> <span class="loader awesome-spin"></span></button>
            <button id="vof-checker__setup-button" class="vof-checker__setup-button disabled"><slot name="setup-button"></slot></button>
        </form>
        <div id="vof-checker__feedback" class="vof-checker__feedback"><slot name="feedback"></slot></div>
    </div>
`
class VofChecker extends HTMLElement {
    constructor(){
        super()
        this.attachShadow({ mode: "open"})
        this.shadowRoot.appendChild(template.content.cloneNode(true))
        this.loader = this.shadowRoot.querySelector('.loader')
        this.btn = this.shadowRoot.querySelector('#vof-checker__button')
        this.setupBtn = this.shadowRoot.querySelector('#vof-checker__setup-button')
        this.chipError = this.shadowRoot.querySelector('#vof-checker__chip-error')
        this.chipSuccess = this.shadowRoot.querySelector('#vof-checker__chip-success')
    }
    
    vormatedValue(val){
      return val.replace(/[^0-9a-zA-Z_-]/g, '')
    }

    async checkDomain(value){
        this.loader.style.display = 'inline-flex'
        this.btn.classList.add('disabled')
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
              this.loader.style.display = 'none'
              this.btn.classList.remove('disabled')
              if (res['setupDone'] || res['creatorInfo'] || res['noNewUsers']) {
                this.setupBtn.classList.add('disabled')
                if (this.chipError.classList.contains('hide'))
                  this.chipError.classList.remove('hide')
                if (!this.chipSuccess.classList.contains('hide'))
                  this.chipSuccess.classList.add('hide')
              } else {
                if (!this.chipError.classList.contains('hide'))
                  this.chipError.classList.add('hide')
                if (this.chipSuccess.classList.contains('hide'))
                  this.chipSuccess.classList.remove('hide')
                this.setupBtn.classList.remove('disabled')
                this.btn.classList.add('disabled')
                this.setupBtn.addEventListener('click', (e) => {
                  e.preventDefault()
                  window.location = `https://${value}${
                    isRaMicro ? '.ra-micro.voffice.pro' : '.voffice.pro'
                  }`
                })
              }
          })
          .catch((error) => {
              this.loader.style.display = 'none'
              this.btn.classList.remove('disabled')
            return console.error('Error', error)
          })
    }
    connectedCallback(){
        let value
        this.shadowRoot.querySelector('input').addEventListener('input', (e) => {
         this.setupBtn.classList.add('disabled')

          if(!this.chipError.classList.contains('hide')) this.chipError.classList.add('hide')
          if(!this.chipSuccess.classList.contains('hide')) this.chipSuccess.classList.add('hide')

           value = e.target.value.toLowerCase()
          
           if (
             this.vormatedValue(value.trim()).length < 3 ||
             this.vormatedValue(value.trim()).length > 30
           ) {
             this.btn.classList.add('disabled')
           } else this.btn.classList.remove('disabled')
        })
        this.shadowRoot.querySelector('button').addEventListener('click', (e)=> {
            e.preventDefault()
            this.checkDomain(this.vormatedValue(value.trim()))
        })
        
    }

}

window.customElements.define('vof-checker', VofChecker)