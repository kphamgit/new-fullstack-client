export default function getQuestionFormatStr(format) {
switch(format) {
    case 1:
        return 'Cloze'
  
    case 3:
        return 'Button Select'
  
    case 4:
        return'Radio'
  
    case 6:
        return 'Word Scramble'
    
    case 7:
        return 'Speech Recognition'
     
    case 8:
        return 'Words Select'
        
    case 9:
        return 'Recording'
    
    default:
        return 'Unknown format'
  }
}