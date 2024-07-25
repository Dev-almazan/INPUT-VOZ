class microfono extends HTMLElement {
    constructor() {
        super();
        this.datos = {
            mic: this.getAttribute("data-mic") || "",
            input: this.getAttribute("data-input") || "",
        }
    }

    static renderVoz(input, inputb) {

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) // Inicializar si el api es compatible en el navegador
        {


            const recognition = new SpeechRecognition();
            console.log(recognition)
            let elemento = document.getElementById(inputb);
            let svgs = document.getElementById(input);

            // Inicializar el elemento de entrada
            elemento.value = "";

            // Agregar la clase de efecto (si es necesario)
            svgs.classList.add('efectoZ');

            // Iniciar el reconocimiento
            recognition.start();

            // Manejar el resultado
            recognition.onresult = (event) => {
                const resultIndex = event.resultIndex;
                const transcript = event.results[resultIndex][0].transcript;
                elemento.value = transcript;
            };

            // Esperar la finalización del reconocimiento
            recognition.onend = () => {
                svgs.classList.remove('efectoZ');
            };
        }
        else {
            document.querySelectorAll(".microfonos").forEach(element => {
                element.style.display = "none";
            });
            console.error('Este navegador no sporta el api de voz.');
        }
    }


    /*Inicializamos componente */
    connectedCallback() {
        this.contenido();
    }

    contenido() {
        this.innerHTML =
            `   
                <!--estilos del componente-->
                <style>
                    .efectoZ
                    {
                            animation: 2s animar infinite;
                            transition:1s all ease;
                            fill: #e3d6d6;
                            padding: 0;
                            border-radius: 10px;
                            position: static;
                            padding: 4% 0;
                            fill: rgba(53, 104, 243, 0.874)  !important ;
                            width: 30px;
                            height: 30px;
                    }

                    .bi-mic
                    {
                        fill: #00578df4 ;
                        cursor: pointer;
                    }

                    @keyframes animar{
                        0% {
                            transform: rotateY(0deg);
                            transform-origin: 50% 25% 0;
                        }
                        100% {
                            transform: rotateY(360deg);
                            transform-origin: 50% 25% 0;
                        }
                    }
                </style>    
                <div onclick="microfono.renderVoz('${this.datos.mic}','${this.datos.input}')">
                    <svg xmlns="http://www.w3.org/2000/svg" id="${this.datos.mic}" width="24" height="24" fill="currentColor"  class=" bi bi-mic" viewBox="0 0 16 16" >
                            <path
                                d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5" />
                            <path d="M10 8a2 2 0 1 1-4 0V3a2 2 0 1 1 4 0zM8 0a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V3a3 3 0 0 0-3-3" />
                    </svg>
                </div>    
                `;
    }

}                                    
