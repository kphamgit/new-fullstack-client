export default function getQuestionFormatStr(format) {
switch(format) {
    case 1:
        return 'Cloze'
      break;
    case 3:
        return 'Button Select'
        break;
    case 4:
        return'Radio'
            break;
    case 6:
        return 'Word Scramble'
        break;
    case 7:
        return 'Speech Recognition'
        break;
    case 8:
        return 'Words Select'
            break;
    case 9:
        return 'Recording'
      break;
    default:
        return 'Unknown format'
  }
}