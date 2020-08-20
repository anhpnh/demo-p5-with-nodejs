$(document).ready(function() {
    console.log("Document ready!!!");
    let socket;
    let lang = "";
    let speechRec;
    socket = io.connect("/");

    socket.on("server-send-data", (data) => {
        $("#txtFriendSpeech").html(`<p style='color:red; font-weight: bold; font-size:30px;'>` + data + `</p>`);
    });


    $("#btnOK").click(() => {
        lang = $("#langs option:selected").text();
        console.log(lang);
        $("#chooseLang").html(`- Your lang: <label style='color:red;'>` + lang + `</label>`);
        if (lang === "") {
            console.log("No lang detect");
            return;
        } else {
            main();
        }
    });


    function main() {
        console.log("lang detect: " + lang);
        speechRec = new p5.SpeechRec(lang, gotSpeech);
        speechRec.continuous = true; // do continuous recognition
        speechRec.interimResults = false; // allow partial recognition (faster, less accurate)
        speechRec.onEnd = startSpeech();

        $("#btnRestart").click(() => {
            startSpeech();
        });

        function startSpeech() {
            console.log("speechRec started!!!");
            speechRec.start();

        }

        function gotSpeech() {
            if (speechRec.resultValue) {
                let data = speechRec.resultString;
                socket.emit("client-send-data", data);
                $("#txtYourSpeech").html(`<p style='color:blue; font-weight: bold; font-size:30px;'>` + data + `</p>`);
            }
            //console.log(speechRec);
        }
    }



});