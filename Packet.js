function Packet(buf){
    this.buf = buf;
    this.offset = 0;
    
    this.length = this.readUInt16(0);
}

Packet.prototype.readUInt16 = function(){ this.offset += 2; return this.buf.readUInt16LE(this.offset-2); };
Packet.prototype.readUInt32 = function(){ this.offset += 4; return this.buf.readUInt32LE(this.offset-4); };
Packet.prototype.readBlob = function(l){ var b = new Buffer(l); this.buf.copy(b, 0, this.offset, this.offset+l); this.offset+=l; return b};
Packet.prototype.readString = function(){ return this.readBlob(this.readUInt16()).toString(); }

Packet.prototype.readClientHeader = function(){ this.msgType = this.readUInt16(); };

function OutPacket(){
    this.buf = [];
}
OutPacket.prototype.writeUInt8 = function(b){ this.buf.push(b & 0xFF); };
OutPacket.prototype.writeUInt16 = function(b){ this.writeUInt8(b & 0xFF); this.writeUInt8((b >> 8) & 0xFF); };
OutPacket.prototype.writeUInt32 = function(b){ this.writeUInt16(b & 0xFFFF); this.writeUInt16((b >> 16) & 0xFFFF); };
OutPacket.prototype.writeBlob = function(b,l){ var i = 0; while(i < l){ this.buf.push(b[i].charCodeAt(0)); ++i; }; };
OutPacket.prototype.writeString = function(str){ this.writeUInt16(str.length); this.writeBlob(str,str.length);};

OutPacket.prototype.serializeClient = function(){ var l = this.buf.length; return new Buffer([l & 0xFF, (l >> 8) & 0xFF].concat(this.buf));  };
