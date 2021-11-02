const template = document.createElement('template')
template.innerHTML = `
<style>
@import url('https://fonts.googleapis.com/css2?family=Gudea&display=swap');

.vof-checker__form {
  display: flex;
  flex-direction: column;
  font-family: Gudea,Roboto,"Helvetica Neue",Arial,sans-serif;
  width: 100%;
}

.vof-checker__inputwrap {
    position: relative;
    flex: 1;
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
  flex: 1;
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
  margin: .5rem 0;
  -webkit-tap-highlight-color: transparent;
}

.vof-checker__buttongroup {
  flex: 1;
  display: flex;
  margin:  0 0 1rem 0;
}

.vof-checker__label {
  flex: 1;
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
    right: -20px;
    top: 0;
    font-size: 0.75rem;
    padding: 2px 5px 2px 0;
    line-height: 24px;
    
  }
  .vof-checker__chip-error {
    position: absolute;
    right: -20px;
    top: 0;
    font-size: 0.75rem;
    padding: 2px 0px 2px 0;
    line-height: 24px;
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

  .vof-checker__error {
    visibility: hidden;
    opacity: 0;
    transition: visibility 0.3s, opacity 0.5s, height 0.2s linear;
    height: 0;
    color: red;
    line-height: 1.1;
    font-size: 90%;
    padding: 8px 14px;
  }

  .hide{
    visibility: hidden;
    opacity: 0;
    height: 0;
    transition: visibility 0.3s, opacity 0.5s, height 0.2s linear;
  }

  .show {
    visibility: visible;
  opacity: 1;
  height: 100%;
  transition: visibility 0.3s, opacity 0.5s, height 0.2s linear;
  }

  .vof-checker__chip-error.hide, .vof-checker__chip-success.hide {
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
            <input id="vof-checker__input" class="vof-checker__input" type="text" maxlength="41" />
            <span id="vof-checker__chip-error" class="vof-checker__chip-error hide"><span class="vof-checker__chip-error-icon">&#10006;</span><slot name="chip-error"></slot></span>
            <span id="vof-checker__chip-success" class="vof-checker__chip-success hide"><span class="vof-checker__chip-success-icon">&#10004;</span><slot name="chip-success"></slot></span>
            <div id="vof-checker__error" class="vof-checker__error"><slot name="error"></slot></div>
            </div>
            <div class="vof-checker__buttongroup">
            <button id="vof-checker__button" class="vof-checker__button disabled"><slot name="button"></slot> <span class="loader awesome-spin"></span></button>
            <button id="vof-checker__setup-button" class="vof-checker__setup-button disabled"><slot name="setup-button"></slot></button>
            </div>
        </form>
        
        <div id="vof-checker__feedback" class="vof-checker__feedback"><slot name="feedback"></slot></div>
    </div>
`
class VofChecker extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.hasError = false
    this.shadowRoot.appendChild(template.content.cloneNode(true))
    this.input = this.shadowRoot.querySelector('#vof-checker__input')
    this.loader = this.shadowRoot.querySelector('.loader')
    this.btn = this.shadowRoot.querySelector('#vof-checker__button')
    this.setupBtn = this.shadowRoot.querySelector('#vof-checker__setup-button')
    this.chipError = this.shadowRoot.querySelector('#vof-checker__chip-error')
    this.error = this.shadowRoot.querySelector('#vof-checker__error')
    this.chipSuccess = this.shadowRoot.querySelector(
      '#vof-checker__chip-success'
    )
  }

  async checkDomain(value, hasError) {
    this.loader.style.display = 'inline-flex'
    this.btn.classList.add('disabled')
    const isRaMicro = this.getAttribute('isramicro') === 'ja'
    const partnerId = this.getAttribute('partnerid') !== ''
    hasError = this.hasError
    const headers = new Headers()
    headers.append('Content-Type', 'application/json')
    headers.append('Accept', 'application/json')

    !hasError &&
      (await fetch(
        `https://${value}${
          isRaMicro ? '.ra-micro.voffice.pro' : '.voffice.pro'
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
        }))
  }

  connectedCallback() {
    let value // get input-value
    const placeholder = this.getAttribute('placeholder') // get placeholder value
    this.input.setAttribute('placeholder', placeholder) // set input placeholder

    const disableCheckBtn = (hasError) =>
      hasError
        ? this.btn.classList.add('disabled')
        : this.btn.classList.remove('disabled')

    const errorHandler = (hasError) => {
      if (hasError) {
        // errormessage handler
        this.error.classList.add('show')
        this.error.classList.remove('hide')
        disableCheckBtn(true)
        this.hasError = true
      } else {
        this.error.classList.remove('show')
        this.error.classList.add('hide')
        disableCheckBtn(false)
        this.hasError = false
      }
    }

    const vormatedValue = (val) => {
      return val.replaceAll(/-{2,}/g, '-')
    }

    this.input.addEventListener('input', (e) => {
      value = vormatedValue(e.target.value.toLowerCase().trim())
      e.preventDefault()

      this.setupBtn.classList.add('disabled')
      this.btn.classList.add('disabled') // disable checking-btn

      if (/^[0-9]/i.test(value)) errorHandler(true)
      else if (!/^.{3,40}$/i.test(value)) errorHandler(true)
      else if (!/[0-9a-zA-Z-]/i.test(value)) errorHandler(true)
      else errorHandler(false)

      if (!this.chipError.classList.contains('hide'))
        // error-chip handler
        this.chipError.classList.add('hide')

      if (!this.chipSuccess.classList.contains('hide'))
        // success-chip handler
        this.chipSuccess.classList.add('hide')
    })

    this.input.addEventListener('keydown', (e) => {
      // block enter key if has error
      if (e.key === 'Enter' && this.hasError) {
        errorHandler(true)
      }
    })

    this.btn.addEventListener('click', (e) => {
      e.preventDefault()
      if (!this.hasError) {
        this.checkDomain(value)
      }
    })

    this.input.onkeydown = function (e) {
      if (
        e.key === ' ' ||
        e.key === 'ä' ||
        e.key === 'Ä' ||
        e.key === 'ö' ||
        e.key === 'Ö' ||
        e.key === 'ü' ||
        e.key === 'Ü' ||
        e.key === 'ß' ||
        e.key === '.' ||
        /[^a-zA-Z0-9-]/i.test(e.key)
      ) {
        console.log(e.key + ' illegal character')
        return false
      }
    }
  }
}

window.customElements.define('vof-checker', VofChecker)