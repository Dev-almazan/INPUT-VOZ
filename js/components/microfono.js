

class microfono extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' }); // Crea el Shadow DOM
        this.mic = this.getAttribute('mic') ? this.getAttribute('mic') : ''
        const template = document.createElement('template');
        template.innerHTML = `
      <style>
        #mic-container 
        {
            box-sizing:border-box;
            padding: 1rem ;
            display: grid;
            align-items: center;
            margin: 0 auto;
            justify-content: center;
            width: 100% ;
            height: auto;
            text-align: center;
            font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
            font-size: 1.7em;
            color: var(--c-primary);
            box-shadow: 0 .125rem .25rem rgba(0,0,0,.075) !important;
            background-color:#fff;
             border-radius: 1%;
        }

          #mic-container  svg
        {
            background-color:var(--c-primary) ;
            margin:  0 auto;
            display: flex;
            width: 100px;
            height: 100px;
            padding: 1rem 0;
            box-sizing: border-box;
            border-radius: 20%;
            
        }




                  .efectoZ {
                      animation: 2s animar infinite;
                      transition: 1s all ease;
                      fill: #e3d6d6;
                      padding: 0;
                      border-radius: 10px;
                      position: static;
                  }

                  .bi-mic {
                      fill: #dee4e7f4;
                      cursor: pointer;
                  }

                  @keyframes animar {
                      0% {
                          transform: rotateY(0deg);
                          transform-origin: 50% 25% 0;
                      }

                      100% {
                          transform: rotateY(360deg);
                          transform-origin: 50% 25% 0;
                      }
                  }



           
            .card {
            width: 90%;
            height: auto;
            margin: 0 auto;
            background-color: #F8FBFE;
            border-radius: 8px;
            z-index: 1;
            padding:2rem;
            box-shadow: 0 .125rem .25rem rgba(0,0,0,.075) !important;
            box-sizing:border-box;

            }

            .tools {
            display: flex;
            align-items: center;
            padding: 9px;
            }

             #tools .circle {
            padding: 0 4px;
            }

            #tools .box {
            display: inline-block;
            align-items: center;
            width: 10px;
            height: 10px;
            padding: 1px;
            border-radius: 50%;
            }

            #tools .red {
            background-color: #ff605c;
            }

              #tools .yellow {
            background-color: #ffbd44;
            }

              #tools  .green {
            background-color: #00ca4e;
            }

            #resultTranslate
            {
                   font-size:1em ;
                   text-align:left;
            }

      </style>
      <div id="mic-container">
        <svg xmlns="http://www.w3.org/2000/svg" id="${this.mic}" fill="currentColor" class="bi bi-mic" viewBox="0 0 16 16">
                    <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z" />
                    <path d="M10 8a2 2 0 1 1-4 0V3a2 2 0 1 1 4 0zM8 0a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V3a3 3 0 0 0-3-3" />
        </svg>
        <h2>Presiona Aquí</h2>
        <div class="card" id="tools">
            <div class="tools"  >
                <div class="circle">
                <span class="red box"></span>
                </div>
                <div class="circle">
                <span class="yellow box"></span>
                </div>
                <div class="circle">
                <span class="green box"></span>
                </div>
            </div>
            <div class="card__content">
                    <p id="resultTranslate">...</p>
            </div>
            </div>
      </div>
        `;
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.shadowRoot.getElementById(this.mic).addEventListener('click', () => {
            this.renderVoz(this.mic,this.shadowRoot);
        });
       
    }

    renderVoz(elementId,shadowRoot) {

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.lang = 'es-MX'; 
        const svg = shadowRoot.getElementById(elementId);
        const p = shadowRoot.getElementById('resultTranslate');


        // Agregar la clase de efecto (si es necesario)
        svg.classList.add('efectoZ')
        p.innerHTML = 'Escuchando...'
        // Iniciar el reconocimiento
        recognition.start();

        // Manejar el resultado del reconocimiento
        recognition.onresult = (event) => {
            const resultIndex = event.resultIndex;
            const transcript = resultIndex === 0 && event.results[resultIndex][0].transcript  ; //resultado del reconocimiento de voz
            p.innerHTML = transcript;
        };

        // Esperar la finalización del reconocimiento
        recognition.onend = () => {
            svg.classList.remove('efectoZ');
        };

        // Manejar el estado en caso de que no haya reconocimiento
        recognition.onerror = (event) => {
            p.innerHTML = 'Ups hubo un problema con el audio, intenta nuevamente'
            console.error(event)
        };

    }
}


//mandamos a llamar componente si es compatible con el navegador
if (window.SpeechRecognition || window.webkitSpeechRecognition) {
    customElements.define("traductor-microfono", microfono);
}
