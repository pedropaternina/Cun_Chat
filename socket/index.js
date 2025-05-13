const { Server } = require("socket.io");

const io = new Server({cors: "http://localhost:4000"});

let onlineUser = []


//aqui esperamos y escuchamos un evento cuando este llegue permite ejecutar el codigo
io.on("connection", (socket) => {
  console.log("new connection", socket.id)

  //escucharEventos
  socket.on("addNewUser", (userId) => {
    if(!userId) return

    if(!onlineUser.some(user => user.userId === userId)){
        onlineUser.push({
        userId,
        socketId: socket.id
    })
    }
     
    console.log("onlineUsers", onlineUser)

  io.emit("getOnlineUsers", onlineUser)
  })

  //añadir mensaje
  socket.on("sendMessage", (message) => {
    const user = onlineUser.find((user) => user.userId === message.recipientId)

    if(user){
      io.to(user.socketId).emit("getMessage",message)
    }
  })


  socket.on("disconnect", () => {
    onlineUser = onlineUser.filter(user => user.socketId !== socket.id)
    io.emit("getOnlineUsers", onlineUser)

  })
  
});

io.listen(3000);