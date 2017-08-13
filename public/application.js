
var Instrument = function(){

  var context = new (window.AudioContext || window.webkitAudioContext)();

  var setupNote = function(frequency, waveForm = "sine"){
    var oscillator = context.createOscillator()
    oscillator.type = waveForm
    oscillator.frequency.value = frequency
    var gainNode = context.createGain()
    oscillator.connect(gainNode)
    gainNode.connect(context.destination)
    return {oscillator, gainNode, context}
  };

  var playNote = function(noteName, volume){
    noteName.gainNode.gain.value = volume
    noteName.oscillator.start()
    
    noteName.gainNode.gain.linearRampToValueAtTime(0, context.currentTime + .5)
  };

  var listenOn = function(id, frequency, letterKey, waveForm, volume){
  
    
    $(document).keydown(function(event){
      if (event.key == letterKey){
        var note = setupNote(frequency, waveForm)
        playNote(note, volume)
        $(id).animate({ opacity: 0.2 }, 100, 'linear', function(){
          $(this).animate({ opacity: 1 }, 100, 'linear')
        })
      };
    });

    $(document).on("click", id, function(){
      var note = setupNote(frequency, waveForm)
      playNote(note, volume)
      $(id).animate({ opacity: 0.2 }, 100, 'linear', function(){
        $(this).animate({ opacity: 1 }, 100, 'linear')
      })
    })
  };

// Starts on C3.
  var fullScale = [
      130.81,
      138.59,
      146.83,
      155.56,
      164.81,
      174.61,
      185.00,
      196.00,
      207.65,
      220.00,
      233.08,
      246.94,
      261.63,
      277.18,
      293.66,
      311.13,
      329.63,
      349.23,
      369.99,
      392.00,
      415.30,
      440.00,
      466.16,
      493.88,
      523.25
  ]

  var findMajorKey = function(firstNoteIndex){
    var key = []
    key.push(fullScale[firstNoteIndex])
    key.push(fullScale[firstNoteIndex + 2])
    key.push(fullScale[firstNoteIndex + 4])
    key.push(fullScale[firstNoteIndex + 5])
    key.push(fullScale[firstNoteIndex + 7])
    key.push(fullScale[firstNoteIndex + 9])
    key.push(fullScale[firstNoteIndex + 11])
    key.push(fullScale[firstNoteIndex + 12])
    return key
  };  
  

  this.start = function(keyNum, waveForm, volume = 1){
    var currentKey = findMajorKey(keyNum)

    $(document).off("keydown")
    $("#c").off()
    listenOn("#c", currentKey[0], "a", waveForm, volume)
    $("#d").off()
    listenOn("#d", currentKey[1], "s", waveForm, volume)
    $("#e").off()
    listenOn("#e", currentKey[2], "d", waveForm, volume)
    $("#f").off()
    listenOn("#f", currentKey[3], "f", waveForm, volume)
    $("#g").off()
    listenOn("#g", currentKey[4], "j", waveForm, volume)
    $("#a").off()
    listenOn("#a", currentKey[5], "k", waveForm, volume)
    $("#b").off()
    listenOn("#b", currentKey[6], "l", waveForm, volume)
    $("#c5").off()
    listenOn("#c5",currentKey[7], ";", waveForm, volume)
  }

}

function go(){
  keyNum = parseInt($("#keychoiceForm input[type='radio']:checked").val())
  waveForm = $("#waveFormChoiceForm input[type='radio']:checked").val()
  volume = parseInt($("#volumeChoiceForm input[type='range']").val()) / 10
  currentInstrument.start(keyNum, waveForm, volume)
}

var currentInstrument = new Instrument
currentInstrument.start(0)


$(document).ready(function(){
  $(".majorkey").on("click", function(event){
    go()
  })

  $(".waveForm").on("click", function(event){
    go()
  })

  $("#volumeSlider").on("change", function(event){
    go()
  })
});

