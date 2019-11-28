(() => {
    class Alertchat {
      setupSocket() {
        // Cria um novo WebSocket 
        this.count = 0
        this.socket = new WebSocket("ws://localhost:4000/ws/chat?15741086386d808985617c8e0cd327537461d928a7")
        // this.socket.addEventListener("open", () => {
        //   this.socket.send("15741086386d808985617c8e0cd327537461d928a7")
        // })
        // ouvinte de evento para as mensagens recebidas
        this.socket.addEventListener("message", (event) => {
          this.count++
          let msg = this.count
          const time = document.createElement("span")
          const divTag1 = document.createElement("div")
          const divTag = document.createElement("div")
          let datetime = new Date(Date.now())
          time.innerText = datetime.getHours() + ":" + datetime.getMinutes('MM')
          time.className = "msg_time_send"
          divTag1.className = "d-flex justify-content-end mb-4"
          divTag.className = "msg_container_send"
          divTag1.id = "conteiner-" + this.count
          divTag.id = "msg-send-" + this.count
          divTag.innerHTML = event.data
          document.getElementById("count").innerText = msg
          document.getElementById("main").append(divTag1)
          document.getElementById("conteiner-" + this.count).append(divTag)
          document.getElementById("msg-send-" + this.count).appendChild(time)
        })
        // Ouvinte de evento para encerramento da conexão, caso estiver fechada, abre novamente      
        this.socket.addEventListener("close", () => {
          this.setupSocket()
        })
      }
  
      submit(event) {
        event.preventDefault()
        const input = document.getElementById("message")
        const message = input.value
        input.value = ""
  
        // converte a mensagem para JSON e envia para o socket
        this.socket.send(
          JSON.stringify({
            data: { message: message },
          })
        )
      }
    }
    const websocketClass = new Alertchat()
    websocketClass.setupSocket()
    // Quando o botão de enviar for pressionado os dados são enviador para o servidor de socket
    document.getElementById("button")
      .addEventListener("click", (event) => websocketClass.submit(event))
   
      // Enviar mensagem com ENTER
    document.onkeydown = function (e) {
      if (e.which == 13) {
        if (document.getElementById('message').value == "") {
        } else {
          websocketClass.submit(event);
        }
      }
    }
  
    //autoscroll
    var out = document.getElementById("out");
    // allow 1px inaccuracy by adding 1
    var isScrolledToBottom = out.scrollHeight - out.clientHeight <= out.scrollTop + 1;
    if (isScrolledToBottom)
      out.scrollTop = out.scrollHeight - out.clientHeight;
  
  })()