const { io } = require("../index");
const Band = require("../models/band");

const Bands = require("../models/bands");

const bands = new Bands();

bands.addBand(new Band("Queen", 1));
bands.addBand(new Band("Metalica", 2));
bands.addBand(new Band("Papa roach", 3));
bands.addBand(new Band("Mana", 3));
bands.addBand(new Band("My chemical romance", 2));
//Mensajes Socket
io.on("connection", (client) => {
  console.log("Client Conect");

  client.emit("bands", bands.getBands());

  client.on("disconnect", () => {
    console.log("Client disconect");
  });

  client.on("mensaje", (payload) => {
    console.log("Recibiendo: ", payload);
    io.emit("mensaje", { admin: "Nuevo mensaje" });
  });

  client.on("emitir-mensaje", (payload) => {
    // io.emit("nuevo-mensaje", payload); //Emite a todos los clientes conectados
    //console.log(payload);
    client.broadcast.emit("nuevo-mensaje", payload); //Emite a todos menos al que esta emitiendo
  });

  //Vote by band
  client.on("band-votes", (payload) => {
    bands.voteBand(payload.id);
    io.emit("bands", bands.getBands());
  });

  //Add new Band
  client.on("add-band", (payload) => {
    const newBand = new Band(payload.name);
    bands.addBand(newBand);
    io.emit("bands", bands.getBands());
  });

  //Delete band
  client.on("delete-band", (payload) => {
    bands.deleteBand(payload.id);
    io.emit("bands", bands.getBands());
  });
});
