/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var thor_io_client_vnext_1 = __webpack_require__(1);
var Vector3 = /** @class */ (function () {
    function Vector3(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    Vector3.prototype.length = function () {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
        ;
    };
    Vector3.prototype.normalize = function () {
        var lengthval = this.length();
        if (lengthval != 0) {
            this.x /= lengthval;
            this.y /= lengthval;
            this.z /= lengthval;
            return true;
        }
        else {
            return false;
        }
    };
    Vector3.prototype.angle = function (vectorB) {
        var anorm = new Vector3(this.x, this.y, this.z);
        anorm.normalize();
        var bnorm = new Vector3(vectorB.x, vectorB.y, vectorB.z);
        bnorm.normalize();
        var dot = anorm.dot(bnorm);
        return Math.acos(dot);
    };
    Vector3.prototype.cross = function (vectorB) {
        var tempvec = new Vector3(this.x, this.y, this.z);
        tempvec.x = (this.y * vectorB.z) - (this.z * vectorB.y);
        tempvec.y = (this.z * vectorB.x) - (this.x * vectorB.z);
        tempvec.z = (this.x * vectorB.y) - (this.y * vectorB.x);
        this.x = tempvec.x;
        this.y = tempvec.y;
        this.z = tempvec.z;
    };
    Vector3.prototype.dot = function (b) {
        return this.x * b.x + this.y * b.y + this.z * b.z;
    };
    return Vector3;
}());
var NetworkEventMessage = /** @class */ (function () {
    function NetworkEventMessage(data) {
        this.value = data;
        this.ts = performance.now();
    }
    return NetworkEventMessage;
}());
var TestApp = /** @class */ (function () {
    function TestApp() {
        var _this = this;
        var serverUrl = location.origin.replace(/^http/, 'ws');
        this.factory = new thor_io_client_vnext_1.ThorIOClient.Factory(serverUrl, ["rdtest", "rocketGame", "chat"]);
        // We got a connection to server 
        this.factory.OnOpen = function () {
            _this.rdTestProxy = _this.factory.GetProxy("rdtest");
            console.log(_this.rdTestProxy);
            _this.chatProxy = _this.factory.GetProxy("chat");
            console.log(_this.chatProxy);
            _this.rocketController = _this.factory.GetProxy("rocketGame");
            console.log(_this.rocketController);
            // connect the Prox
            // When we got a connection ( proxy ) to the controller 
            _this.rdTestProxy.OnOpen = function () {
                _this.rdTestProxy.Subscribe("tempChange", function (data) {
                    _this.showData(data);
                });
                _this.chatProxy.Invoke("changeGroup", "lobby");
                _this.chatProxy.Invoke("changeNickName", "Marlon Brando");
            };
            _this.rocketController.OnOpen = function () {
                _this.rocketController.On("onRocketMove", (function (move) {
                    _this.showData(move);
                }));
            };
            // set up listeners 
            _this.rdTestProxy.On("invokeAndReturn", function (data) { _this.showData(data); });
            _this.rdTestProxy.On("invokeAndSendToAll", function (data) { _this.showData(data); });
            _this.rdTestProxy.On("invokeAndSendOthers", function (data) { _this.showData(data); });
            _this.rdTestProxy.On("invokeToExpr", function (data) { _this.showData(data); });
            _this.chatProxy.On("chatMessage", function (data) { _this.showData(data); });
            // add event listeners for the UI and Invokes...
            document.querySelector("#btn-invoke").addEventListener("click", function (e) {
                _this.rdTestProxy.Invoke("invokeAndReturn", {
                    text: "invokeAndReturn called",
                    num: 1 + Math.random() * 10,
                });
            });
            document.querySelector("#btn-invokeAll").addEventListener("click", function (e) {
                _this.rdTestProxy.Invoke("invokeAndSendToAll", {
                    text: "invokeAndSendToAll called",
                    num: 1 + Math.random() * 10,
                });
            });
            document.querySelector("#btn-invokeOthers").addEventListener("click", function (e) {
                _this.rdTestProxy.Invoke("invokeAndSendOthers", {
                    text: "invokeAndSendOthers",
                    num: 1 + Math.random() * 10,
                });
            });
            document.querySelector("#btn-invokeTo").addEventListener("click", function (e) {
                _this.rdTestProxy.Invoke("invokeToExpr", {
                    text: "invokeToExpr called",
                    num: 1 + Math.random() * 10,
                });
            });
            document.querySelector("#btn-setProperty").addEventListener("click", function (e) {
                _this.rdTestProxy.SetProperty("size", 11);
            });
            document.querySelector("#btn-publishTemp").addEventListener("click", function (e) {
                var temperatue = {
                    temp: 1. + Math.random() * 10
                };
                _this.rdTestProxy.Publish("publishTemperature", temperatue);
            });
            document.querySelector("#btn-rocketmove").addEventListener("click", function (e) {
                setInterval(function () {
                    var vec3 = new Vector3(Math.random(), Math.random(), Math.random());
                    var msg = new NetworkEventMessage(vec3);
                    _this.rocketController.Invoke("moveRocket", msg);
                }, 100);
            });
            document.querySelector("#chat-message").addEventListener("keyup", function (evt) {
                var el = evt.target;
                if (evt.keyCode === 13) {
                    _this.chatProxy.Invoke("sendChatMessage", {
                        message: el.value
                    });
                    el.value = "";
                }
            });
            console.log("...connect");
            _this.rdTestProxy.Connect();
            _this.chatProxy.Connect();
            _this.rocketController.Connect();
        };
    }
    TestApp.prototype.showData = function (data) {
        var parent = document.querySelector("#debug");
        var el = document.createElement("pre");
        el.textContent = JSON.stringify(data);
        parent.insertBefore(el, parent.firstChild);
    };
    ;
    return TestApp;
}());
exports.TestApp = TestApp;
document.addEventListener("DOMContentLoaded", function () {
    var testApp = new TestApp();
    console.log("testApp", testApp);
});
//# sourceMappingURL=test.js.map

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__(2));
//# sourceMappingURL=index.js.map

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ThorIOClient;
(function (ThorIOClient) {
    var BinaryMessage = (function () {
        function BinaryMessage(message, arrayBuffer) {
            this.arrayBuffer = arrayBuffer;
            this.header = new Uint8Array(ThorIOClient.Utils.longToArray(message.length));
            this.Buffer = this.joinBuffers(this.joinBuffers(this.header.buffer, ThorIOClient.Utils.stingToBuffer(message).buffer), arrayBuffer);
        }
        BinaryMessage.fromArrayBuffer = function (buffer) {
            var bytes = new Uint8Array(buffer);
            var headerLen = 8;
            var header = bytes.slice(0, 8);
            var payloadLength = ThorIOClient.Utils.arrayToLong(header);
            var start = header.byteLength + payloadLength;
            var bytesMessage = bytes.slice(header.byteLength, start);
            var stop = buffer.byteLength - start;
            var messageBuffer = bytes.slice(start, stop);
            var message = JSON.parse(String.fromCharCode.apply(null, new Uint16Array(bytesMessage)));
            return new Message(message.T, message.D, message.C, messageBuffer);
        };
        BinaryMessage.prototype.joinBuffers = function (a, b) {
            var newBuffer = new Uint8Array(a.byteLength + b.byteLength);
            newBuffer.set(new Uint8Array(a), 0);
            newBuffer.set(new Uint8Array(b), a.byteLength);
            return newBuffer.buffer;
        };
        return BinaryMessage;
    }());
    ThorIOClient.BinaryMessage = BinaryMessage;
    var Message = (function () {
        function Message(topic, object, controller, buffer) {
            this.D = object;
            this.T = topic;
            this.C = controller;
            this.B = buffer;
        }
        Object.defineProperty(Message.prototype, "JSON", {
            get: function () {
                return {
                    T: this.T,
                    D: JSON.stringify(this.D),
                    C: this.C
                };
            },
            enumerable: true,
            configurable: true
        });
        ;
        Message.prototype.toString = function () {
            return JSON.stringify(this.JSON);
        };
        Message.fromArrayBuffer = function (buffer) {
            return ThorIOClient.BinaryMessage.fromArrayBuffer(buffer);
        };
        return Message;
    }());
    ThorIOClient.Message = Message;
    var PeerConnection = (function () {
        function PeerConnection() {
        }
        return PeerConnection;
    }());
    ThorIOClient.PeerConnection = PeerConnection;
    var WebRTCConnection = (function () {
        function WebRTCConnection(id, rtcPeerConnection) {
            this.id = id;
            this.RTCPeer = rtcPeerConnection;
            this.streams = new Array();
        }
        return WebRTCConnection;
    }());
    ThorIOClient.WebRTCConnection = WebRTCConnection;
    var Recorder = (function () {
        function Recorder(stream, mimeType, ignoreMutedMedia) {
            var _this = this;
            this.stream = stream;
            this.mimeType = mimeType;
            this.ignoreMutedMedia = ignoreMutedMedia;
            this.recorder = new MediaRecorder(stream, { mimeType: mimeType, ignoreMutedMedia: ignoreMutedMedia });
            this.recorder.onstop = function (event) {
                _this.handleStop(event);
            };
            this.recorder.ondataavailable = function (event) {
                _this.handleDataAvailable(event);
            };
        }
        Recorder.prototype.handleStop = function (event) {
            this.IsRecording = false;
            var blob = new Blob(this.blobs, { type: this.mimeType });
            this.OnRecordComplated.apply(event, [blob, URL.createObjectURL(blob)]);
        };
        Recorder.prototype.OnRecordComplated = function (blob, blobUrl) { };
        Recorder.prototype.handleDataAvailable = function (event) {
            if (event.data.size > 0) {
                this.blobs.push(event.data);
            }
        };
        Recorder.prototype.IsTypeSupported = function (type) {
            throw "not yet implemented";
        };
        Recorder.prototype.GetStats = function () {
            return {
                videoBitsPerSecond: this.recorder.videoBitsPerSecond,
                audioBitsPerSecond: this.recorder.audioBitsPerSecond
            };
        };
        Recorder.prototype.Stop = function () {
            this.recorder.stop();
        };
        Recorder.prototype.Start = function (ms) {
            this.blobs = new Array();
            if (this.IsRecording) {
                this.Stop();
                return;
            }
            this.blobs.length = 0;
            this.IsRecording = true;
            this.recorder.start(ms || 100);
        };
        return Recorder;
    }());
    ThorIOClient.Recorder = Recorder;
    var PeerChannel = (function () {
        function PeerChannel(peerId, dataChannel, label) {
            this.peerId = peerId;
            this.dataChannel = dataChannel;
            this.label = label;
        }
        return PeerChannel;
    }());
    ThorIOClient.PeerChannel = PeerChannel;
    var DataChannel = (function () {
        function DataChannel(name, listeners) {
            this.listeners = listeners || new Array();
            this.PeerChannels = new Array();
            this.Name = name;
        }
        DataChannel.prototype.On = function (topic, fn) {
            var listener = new ThorIOClient.Listener(topic, fn);
            this.listeners.push(listener);
            return listener;
        };
        ;
        DataChannel.prototype.OnOpen = function (event, peerId) { };
        ;
        DataChannel.prototype.OnClose = function (event, peerId) { };
        DataChannel.prototype.OnMessage = function (event) {
            var msg = JSON.parse(event.data);
            var listener = this.findListener(msg.T);
            if (listener)
                listener.fn.apply(this, [JSON.parse(msg.D)]);
        };
        DataChannel.prototype.Close = function () {
            this.PeerChannels.forEach(function (pc) {
                pc.dataChannel.close();
            });
        };
        DataChannel.prototype.findListener = function (topic) {
            var listener = this.listeners.filter(function (pre) {
                return pre.topic === topic;
            });
            return listener[0];
        };
        DataChannel.prototype.Off = function (topic) {
            var index = this.listeners.indexOf(this.findListener(topic));
            if (index >= 0)
                this.listeners.splice(index, 1);
        };
        ;
        DataChannel.prototype.Invoke = function (topic, data, controller) {
            var _this = this;
            this.PeerChannels.forEach(function (channel) {
                if (channel.dataChannel.readyState === "open") {
                    channel.dataChannel.send(new ThorIOClient.Message(topic, data, _this.Name).toString());
                }
            });
            return this;
        };
        DataChannel.prototype.AddPeerChannel = function (pc) {
            this.PeerChannels.push(pc);
        };
        DataChannel.prototype.RemovePeerChannel = function (id, dataChannel) {
            var match = this.PeerChannels.filter(function (p) {
                return p.peerId === id;
            })[0];
            var index = this.PeerChannels.indexOf(match);
            if (index > -1)
                this.PeerChannels.splice(index, 1);
        };
        return DataChannel;
    }());
    ThorIOClient.DataChannel = DataChannel;
    var BandwidthConstraints = (function () {
        function BandwidthConstraints(videobandwidth, audiobandwidth) {
            this.videobandwidth = videobandwidth;
            this.audiobandwidth = audiobandwidth;
        }
        return BandwidthConstraints;
    }());
    ThorIOClient.BandwidthConstraints = BandwidthConstraints;
    var WebRTC = (function () {
        function WebRTC(brokerProxy, rtcConfig) {
            var _this = this;
            this.brokerProxy = brokerProxy;
            this.rtcConfig = rtcConfig;
            this.getPeerIndex = function (id) {
                return this.Peers.findIndex(function (pre) { return pre.id === id; });
            };
            this.Errors = new Array();
            this.DataChannels = new Array();
            this.Peers = new Array();
            this.LocalStreams = new Array();
            this.signalHandlers();
            brokerProxy.On("contextCreated", function (peer) {
                _this.LocalPeerId = peer.peerId;
                _this.Context = peer.context;
                _this.OnContextCreated(peer);
            });
            brokerProxy.On("contextChanged", function (context) {
                _this.Context = context;
                _this.OnContextChanged(context);
            });
            brokerProxy.On("connectTo", function (peers) {
                _this.OnConnectTo(peers);
            });
        }
        WebRTC.prototype.setBandwithConstraints = function (videobandwidth, audiobandwidth) {
            this.bandwidthConstraints = new BandwidthConstraints(videobandwidth, audiobandwidth);
        };
        WebRTC.prototype.setMediaBitrates = function (sdp) {
            return this.setMediaBitrate(this.setMediaBitrate(sdp, "video", this.bandwidthConstraints.videobandwidth), "audio", this.bandwidthConstraints.audiobandwidth);
        };
        WebRTC.prototype.setMediaBitrate = function (sdp, media, bitrate) {
            var lines = sdp.split("\n");
            var line = -1;
            for (var i = 0; i < lines.length; i++) {
                if (lines[i].indexOf("m=" + media) === 0) {
                    line = i;
                    break;
                }
            }
            if (line === -1) {
                return sdp;
            }
            line++;
            while (lines[line].indexOf("i=") === 0 || lines[line].indexOf("c=") === 0) {
                line++;
            }
            if (lines[line].indexOf("b") === 0) {
                lines[line] = "b=AS:" + bitrate;
                return lines.join("\n");
            }
            var newLines = lines.slice(0, line);
            newLines.push("b=AS:" + bitrate);
            newLines = newLines.concat(lines.slice(line, lines.length));
            return newLines.join("\n");
        };
        WebRTC.prototype.CreateDataChannel = function (name) {
            var channel = new DataChannel(name);
            this.DataChannels.push(channel);
            return channel;
        };
        WebRTC.prototype.RemoveDataChannel = function (name) {
            var match = this.DataChannels.filter(function (p) { return p.Name === name; })[0];
            this.DataChannels.splice(this.DataChannels.indexOf(match), 1);
        };
        WebRTC.prototype.signalHandlers = function () {
            var _this = this;
            this.brokerProxy.On("contextSignal", function (signal) {
                var msg = JSON.parse(signal.message);
                switch (msg.type) {
                    case "offer":
                        _this.onOffer(signal);
                        break;
                    case "answer":
                        _this.onAnswer(signal);
                        break;
                    case "candidate":
                        _this.onCandidate(signal);
                        break;
                    default:
                        break;
                }
            });
        };
        WebRTC.prototype.addError = function (err) {
            this.OnError(err);
        };
        WebRTC.prototype.OnConnectTo = function (peerConnections) {
            this.Connect(peerConnections);
        };
        WebRTC.prototype.OnConnected = function (peerId) {
            this.OnContextConnected(this.getPeerConnection(peerId));
        };
        WebRTC.prototype.OnDisconnected = function (peerId) {
            var peerConnection = this.getPeerConnection(peerId);
            peerConnection.close();
            this.OnContextDisconnected(peerConnection);
            this.removePeerConnection(peerId);
        };
        WebRTC.prototype.onCandidate = function (event) {
            var _this = this;
            var msg = JSON.parse(event.message);
            var candidate = msg.iceCandidate;
            var pc = this.getPeerConnection(event.sender);
            pc.addIceCandidate(new RTCIceCandidate({
                sdpMLineIndex: candidate.label,
                candidate: candidate.candidate
            })).then(function () {
            }).catch(function (err) {
                _this.addError(err);
            });
        };
        WebRTC.prototype.onAnswer = function (event) {
            var _this = this;
            var pc = this.getPeerConnection(event.sender);
            pc.setRemoteDescription(new RTCSessionDescription(JSON.parse(event.message))).then(function (p) {
            }).catch(function (err) {
                _this.addError(err);
            });
        };
        WebRTC.prototype.onOffer = function (event) {
            var _this = this;
            var pc = this.getPeerConnection(event.sender);
            this.LocalStreams.forEach(function (stream) {
                pc.addStream(stream);
            });
            pc.setRemoteDescription(new RTCSessionDescription(JSON.parse(event.message)));
            pc.createAnswer(function (description) {
                pc.setLocalDescription(description).then(function () {
                    if (_this.bandwidthConstraints)
                        description.sdp = _this.setMediaBitrates(description.sdp);
                    var answer = {
                        sender: _this.LocalPeerId,
                        recipient: event.sender,
                        message: JSON.stringify(description)
                    };
                    _this.brokerProxy.Invoke("contextSignal", answer);
                }).catch(function (err) {
                });
            }, function (err) {
                _this.addError(err);
            }, {
                mandatory: {
                    "OfferToReceiveAudio": true,
                    "OfferToReceiveVideo": true,
                }
            });
        };
        WebRTC.prototype.AddLocalStream = function (stream) {
            this.LocalStreams.push(stream);
            return this;
        };
        WebRTC.prototype.AddIceServer = function (iceServer) {
            this.rtcConfig.iceServers.push(iceServer);
            return this;
        };
        WebRTC.prototype.removePeerConnection = function (id) {
            var _this = this;
            var connection = this.Peers.filter(function (conn) {
                return conn.id === id;
            })[0];
            connection.streams.forEach(function (stream) {
                _this.OnRemoteStreamlost(stream.id, connection.id);
            });
            var index = this.Peers.indexOf(connection);
            if (index > -1)
                this.Peers.splice(index, 1);
        };
        WebRTC.prototype.createPeerConnection = function (id) {
            var _this = this;
            var rtcPeerConnection = new RTCPeerConnection(this.rtcConfig);
            rtcPeerConnection.onsignalingstatechange = function (state) { };
            rtcPeerConnection.onicecandidate = function (event) {
                if (!event || !event.candidate)
                    return;
                if (event.candidate) {
                    var msg = {
                        sender: _this.LocalPeerId,
                        recipient: id,
                        message: JSON.stringify({
                            type: 'candidate',
                            iceCandidate: event.candidate
                        })
                    };
                    _this.brokerProxy.Invoke("contextSignal", msg);
                }
            };
            rtcPeerConnection.oniceconnectionstatechange = function (event) {
                switch (event.target.iceConnectionState) {
                    case "connected":
                        _this.OnConnected(id);
                        break;
                    case "disconnected":
                        _this.OnDisconnected(id);
                        break;
                }
                ;
            };
            rtcPeerConnection.onaddstream = function (event) {
                var connection = _this.Peers.filter(function (p) {
                    return p.id === id;
                })[0];
                connection.streams.push(event.stream);
                _this.OnRemoteStream(event.stream, connection);
            };
            this.DataChannels.forEach(function (dataChannel) {
                var pc = new PeerChannel(id, rtcPeerConnection.createDataChannel(dataChannel.Name), dataChannel.Name);
                dataChannel.AddPeerChannel(pc);
                rtcPeerConnection.ondatachannel = function (event) {
                    var channel = event.channel;
                    channel.onopen = function (event) {
                        dataChannel.OnOpen(event, id);
                    };
                    channel.onclose = function (event) {
                        dataChannel.RemovePeerChannel(id, event.target);
                        dataChannel.OnClose(event, id);
                    };
                    channel.onmessage = function (message) {
                        dataChannel.OnMessage(message);
                    };
                };
            });
            return rtcPeerConnection;
        };
        WebRTC.prototype.findPeerConnection = function (id) {
            var i = this.getPeerIndex(id);
            return this.Peers[i];
        };
        WebRTC.prototype.reconnectAll = function () {
            var _this = this;
            var peers = this.Peers.map(function (peer) {
                var p = new PeerConnection();
                p.peerId = peer.id;
                p.context = _this.Context;
                return p;
            });
            peers.forEach(function (p) {
                var peer = _this.getPeerIndex(p.peerId);
                var peer = _this.getPeerIndex(p.peerId);
                _this.Peers[peer].RTCPeer.close();
                _this.Peers[peer].streams.forEach(function (stream) {
                    _this.OnRemoteStreamlost(stream.id, p.peerId);
                });
            });
            this.Peers = new Array();
            this.Connect(peers);
            return peers;
        };
        WebRTC.prototype.getPeerConnection = function (id) {
            var match = this.Peers.filter(function (connection) {
                return connection.id === id;
            });
            if (match.length === 0) {
                var pc = new WebRTCConnection(id, this.createPeerConnection(id));
                this.Peers.push(pc);
                return pc.RTCPeer;
            }
            return match[0].RTCPeer;
        };
        WebRTC.prototype.createOffer = function (peer) {
            var _this = this;
            var peerConnection = this.createPeerConnection(peer.peerId);
            this.LocalStreams.forEach(function (stream) {
                peerConnection.addStream(stream);
                _this.OnLocalStream(stream);
            });
            peerConnection.createOffer(function (description) {
                peerConnection.setLocalDescription(description, function () {
                    if (_this.bandwidthConstraints)
                        description.sdp = _this.setMediaBitrates(description.sdp);
                    var offer = {
                        sender: _this.LocalPeerId,
                        recipient: peer.peerId,
                        message: JSON.stringify(description)
                    };
                    _this.brokerProxy.Invoke("contextSignal", offer);
                }, function (err) {
                    _this.addError(err);
                });
            }, function (err) {
                _this.addError(err);
            }, {
                mandatory: {
                    "OfferToReceiveAudio": true,
                    "OfferToReceiveVideo": true,
                }
            });
            return peerConnection;
        };
        WebRTC.prototype.Disconnect = function () {
            this.Peers.forEach(function (connection) {
                connection.RTCPeer.close();
            });
            this.ChangeContext(Math.random().toString(36).substring(2));
        };
        WebRTC.prototype.DisconnectPeer = function (id) {
            var peer = this.findPeerConnection(id);
            peer.RTCPeer.close();
        };
        WebRTC.prototype.Connect = function (peerConnections) {
            var _this = this;
            peerConnections.forEach(function (peerConnection) {
                var pc = new WebRTCConnection(peerConnection.peerId, _this.createOffer(peerConnection));
                _this.Peers.push(pc);
            });
            return this;
        };
        WebRTC.prototype.ChangeContext = function (context) {
            this.brokerProxy.Invoke("changeContext", { context: context });
            return this;
        };
        WebRTC.prototype.ConnectPeers = function () {
            this.brokerProxy.Invoke("connectContext", {});
        };
        WebRTC.prototype.ConnectContext = function () {
            this.ConnectPeers();
        };
        return WebRTC;
    }());
    ThorIOClient.WebRTC = WebRTC;
    var Factory = (function () {
        function Factory(url, controllers, params) {
            var _this = this;
            this.url = url;
            this.proxys = new Array();
            this.ws = new WebSocket(url + this.toQuery(params || {}));
            this.ws.binaryType = "arraybuffer";
            controllers.forEach(function (alias) {
                _this.proxys.push(new Proxy(alias, _this.ws));
            });
            this.ws.onmessage = function (event) {
                if (typeof (event.data) !== "object") {
                    var message = JSON.parse(event.data);
                    _this.GetProxy(message.C).Dispatch(message.T, message.D);
                }
                else {
                    var message = ThorIOClient.BinaryMessage.fromArrayBuffer(event.data);
                    _this.GetProxy(message.C).Dispatch(message.T, message.D, message.B);
                }
            };
            this.ws.onclose = function (event) {
                _this.IsConnected = false;
                _this.OnClose.apply(_this, [event]);
            };
            this.ws.onerror = function (error) {
                _this.OnError.apply(_this, [error]);
            };
            this.ws.onopen = function (event) {
                _this.IsConnected = true;
                _this.OnOpen.apply(_this, _this.proxys);
            };
        }
        Factory.prototype.toQuery = function (obj) {
            return "?" + Object.keys(obj).map(function (key) { return (encodeURIComponent(key) + "=" +
                encodeURIComponent(obj[key])); }).join("&");
        };
        Factory.prototype.Close = function () {
            this.ws.close();
        };
        ;
        Factory.prototype.GetProxy = function (alias) {
            var channel = this.proxys.filter(function (pre) { return (pre.alias === alias); });
            return channel[0];
        };
        ;
        Factory.prototype.RemoveProxy = function (alias) {
            var index = this.proxys.indexOf(this.GetProxy(alias));
            this.proxys.splice(index, 1);
        };
        Factory.prototype.OnOpen = function (proxys) { };
        ;
        Factory.prototype.OnError = function (error) { };
        Factory.prototype.OnClose = function (event) { };
        return Factory;
    }());
    ThorIOClient.Factory = Factory;
    var Listener = (function () {
        function Listener(topic, fn) {
            this.fn = fn;
            this.topic = topic;
            this.count = 0;
        }
        return Listener;
    }());
    ThorIOClient.Listener = Listener;
    var Utils = (function () {
        function Utils() {
        }
        Utils.stingToBuffer = function (str) {
            var len = str.length;
            var arr = new Array(len);
            for (var i = 0; i < len; i++) {
                arr[i] = str.charCodeAt(i) & 0xFF;
            }
            return new Uint8Array(arr);
        };
        Utils.arrayToLong = function (byteArray) {
            var value = 0;
            var byteLength = byteArray.byteLength;
            for (var i = byteLength - 1; i >= 0; i--) {
                value = (value * 256) + byteArray[i];
            }
            return value;
        };
        Utils.longToArray = function (long) {
            var byteArray = new Uint8Array(8);
            var byteLength = byteArray.length;
            for (var index = 0; index < byteLength; index++) {
                var byte = long & 0xff;
                byteArray[index] = byte;
                long = (long - byte) / 256;
            }
            return byteArray;
        };
        Utils.newGuid = function () {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
            }
            ;
            return s4() + s4() + "-" + s4() + "-" + s4() + "-" + s4() + "-" + s4() + s4() + s4();
        };
        return Utils;
    }());
    ThorIOClient.Utils = Utils;
    var PropertyMessage = (function () {
        function PropertyMessage() {
            this.messageId = ThorIOClient.Utils.newGuid();
        }
        return PropertyMessage;
    }());
    ThorIOClient.PropertyMessage = PropertyMessage;
    var Proxy = (function () {
        function Proxy(alias, ws) {
            var _this = this;
            this.alias = alias;
            this.ws = ws;
            this.listeners = new Array();
            this.IsConnected = false;
            this.On("___error", function (err) {
                _this.OnError(err);
            });
        }
        Proxy.prototype.OnError = function (event) { };
        Proxy.prototype.OnOpen = function (event) { };
        Proxy.prototype.OnClose = function (event) { };
        Proxy.prototype.Connect = function () {
            this.ws.send(new ThorIOClient.Message("___connect", {}, this.alias));
            return this;
        };
        ;
        Proxy.prototype.Close = function () {
            this.ws.send(new ThorIOClient.Message("___close", {}, this.alias));
            return this;
        };
        ;
        Proxy.prototype.Subscribe = function (topic, callback) {
            this.ws.send(new ThorIOClient.Message("___subscribe", {
                topic: topic,
                controller: this.alias
            }, this.alias));
            return this.On(topic, callback);
        };
        ;
        Proxy.prototype.Unsubscribe = function (topic) {
            this.ws.send(new ThorIOClient.Message("___unsubscribe", {
                topic: topic,
                controller: this.alias
            }, this.alias));
        };
        ;
        Proxy.prototype.On = function (topic, fn) {
            var listener = new ThorIOClient.Listener(topic, fn);
            this.listeners.push(listener);
            return listener;
        };
        ;
        Proxy.prototype.findListener = function (topic) {
            var listener = this.listeners.filter(function (pre) {
                return pre.topic === topic;
            });
            return listener[0];
        };
        Proxy.prototype.Off = function (topic) {
            var index = this.listeners.indexOf(this.findListener(topic));
            if (index >= 0)
                this.listeners.splice(index, 1);
        };
        ;
        Proxy.prototype.InvokeBinary = function (buffer) {
            if (buffer instanceof ArrayBuffer) {
                this.ws.send(buffer);
                return this;
            }
            else {
                throw ("parameter provided must be an ArrayBuffer constructed by Client.BinaryMessage");
            }
        };
        Proxy.prototype.PublishBinary = function (buffer) {
            if (buffer instanceof ArrayBuffer) {
                this.ws.send(buffer);
                return this;
            }
            else {
                throw ("parameter provided must be an ArrayBuffer constructed by Client.BinaryMessage");
            }
        };
        Proxy.prototype.Invoke = function (topic, data, controller) {
            this.ws.send(new ThorIOClient.Message(topic, data, controller || this.alias));
            return this;
        };
        ;
        Proxy.prototype.Publish = function (topic, data, controller) {
            this.ws.send(new ThorIOClient.Message(topic, data, controller || this.alias));
            return this;
        };
        ;
        Proxy.prototype.SetProperty = function (propName, propValue, controller) {
            this.Invoke(propName, propValue, controller || this.alias);
            return this;
        };
        ;
        Proxy.prototype.Dispatch = function (topic, data, buffer) {
            if (topic === "___open") {
                this.IsConnected = true;
                this.OnOpen(JSON.parse(data));
                return;
            }
            else if (topic === "___close") {
                this.OnClose([JSON.parse(data)]);
                this.IsConnected = false;
            }
            else {
                var listener = this.findListener(topic);
                if (listener)
                    listener.fn(JSON.parse(data), buffer);
            }
        };
        ;
        return Proxy;
    }());
    ThorIOClient.Proxy = Proxy;
})(ThorIOClient = exports.ThorIOClient || (exports.ThorIOClient = {}));
//# sourceMappingURL=ThorIOClient.js.map

/***/ })
/******/ ]);