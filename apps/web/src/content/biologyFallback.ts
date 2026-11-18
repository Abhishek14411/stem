import type { Language } from './translations'
import type { TutorResponse } from '../lib/api'
import type { BiologyTutorModuleId } from '../lib/biology-protocol'

const HINTS: Record<BiologyTutorModuleId, { en: [string, string, string]; hi: [string, string, string] }> = {
  'bio-plant-world': {
    en: ['Roots absorb water and minerals; leaves make sugars using light.', 'Trace the plant parts and compare their jobs.', 'Which plant part is selected?'],
    hi: ['जड़ें पानी और खनिज सोखती हैं; पत्तियाँ प्रकाश की सहायता से शर्करा बनाती हैं।', 'पौधे के भागों को देखें और उनके काम की तुलना करें।', 'मॉडल में पौधे का कौन-सा भाग चुना है?'],
  },
  'bio-diversity': {
    en: ['Biodiversity is the variety of living things. Compare visible features.', 'Use the same observable feature for each example.', 'Which feature or habitat is selected?'],
    hi: ['जैव विविधता का अर्थ जीवों की विविधता है। दिखाई देने वाले लक्षणों की तुलना करें।', 'हर उदाहरण के लिए एक ही दिखाई देने वाले लक्षण की तुलना करें।', 'कौन-सा लक्षण या आवास चुना है?'],
  },
  'bio-plant-exploring': {
    en: ['Plant parts can look different while doing similar jobs.', 'Compare the examples by shape and by the job each part does.', 'Which plant structure is selected?'],
    hi: ['पौधों के भाग दिखने में अलग हो सकते हैं, फिर भी समान काम कर सकते हैं।', 'उदाहरणों की आकृति और उनके काम की तुलना करें।', 'कौन-सी संरचना चुनी है?'],
  },
  'bio-movement': {
    en: ['Joints are where bones meet; muscles contract and pull on bones.', 'Find the joint and observe how the muscles change the angle.', 'Which joint or movement is selected?'],
    hi: ['जोड़ वह जगह है जहाँ हड्डियाँ मिलती हैं; मांसपेशियाँ सिकुड़कर हड्डियों को खींचती हैं।', 'जोड़ देखें और ध्यान दें कि मांसपेशियाँ कोण कैसे बदलती हैं।', 'कौन-सा जोड़ या गति चुनी है?'],
  },
  'bio-classification': {
    en: ['Classification groups organisms using shared characteristics.', 'Choose a feature that can be observed consistently.', 'Which grouping rule is selected?'],
    hi: ['वर्गीकरण समान लक्षणों के आधार पर जीवों को समूहों में रखता है।', 'ऐसा लक्षण चुनें जिसे देखा और तुलना किया जा सके।', 'कौन-सा वर्गीकरण नियम चुना है?'],
  },
  'bio-characteristics': {
    en: ['Living things show growth, nutrition, respiration, response, and reproduction.', 'Compare the selected life process with the example organism.', 'Which process or example is selected?'],
    hi: ['जीवों में वृद्धि, पोषण, श्वसन, प्रतिक्रिया और प्रजनन जैसी प्रक्रियाएँ होती हैं।', 'चुनी हुई जीवन-प्रक्रिया की उदाहरण जीव से तुलना करें।', 'कौन-सी प्रक्रिया या उदाहरण चुना है?'],
  },
  'bio-photosynthesis': {
    en: ['Photosynthesis uses light, water, and carbon dioxide to make glucose and release oxygen.', 'Follow the input and output arrows around the leaf.', 'Which input or condition changed?'],
    hi: ['प्रकाश-संश्लेषण में प्रकाश, पानी और कार्बन डाइऑक्साइड से ग्लूकोज़ बनता है और ऑक्सीजन निकलती है।', 'पत्ती के पास आने और उससे बाहर जाने वाले तीर देखें।', 'कौन-सा इनपुट या स्थिति बदली है?'],
  },
  'bio-digestion': {
    en: ['Food moves from the mouth through the food pipe and stomach; most nutrients are absorbed in the small intestine.', 'Trace the food path in order.', 'Which digestive organ is selected?'],
    hi: ['भोजन मुँह से भोजन-नली और आमाशय होकर जाता है; अधिकतर पोषक तत्व छोटी आँत में सोखे जाते हैं।', 'भोजन के रास्ते को क्रम से देखें।', 'पाचन तंत्र का कौन-सा अंग चुना है?'],
  },
  'bio-respiration': {
    en: ['Breathing supports gas exchange; cellular respiration releases usable energy inside cells.', 'Separate air movement from the process happening inside cells.', 'Which organism or activity is selected?'],
    hi: ['श्वसन में गैसों का आदान-प्रदान होता है; कोशिकीय श्वसन में कोशिकाएँ भोजन से ऊर्जा छोड़ती हैं।', 'हवा की आवाजाही और कोशिकाओं के भीतर की प्रक्रिया में अंतर देखें।', 'कौन-सा जीव या गतिविधि चुनी है?'],
  },
  'bio-transport': {
    en: ['The heart pumps blood; xylem carries water and minerals, while phloem transports sugars in plants.', 'Follow the arrows and compare animal and plant pathways.', 'Which transport route is selected?'],
    hi: ['हृदय रक्त पंप करता है; पौधों में जाइलम पानी और खनिज तथा फ्लोएम शर्करा पहुँचाता है।', 'तीरों को देखें और जीव तथा पौधे के रास्तों की तुलना करें।', 'कौन-सा परिवहन मार्ग चुना है?'],
  },
  'bio-plant-repro': {
    en: ['Pollination transfers pollen to a stigma; after fertilization, ovules develop into seeds.', 'Place the stages in order from pollination to seed dispersal.', 'Which life-cycle stage is selected?'],
    hi: ['परागण में परागकण वर्तिकाग्र तक पहुँचते हैं; निषेचन के बाद बीजांड से बीज बनता है।', 'परागण से बीज-प्रसार तक की अवस्थाओं को क्रम में देखें।', 'जीवन-चक्र की कौन-सी अवस्था चुनी है?'],
  },
  'bio-forest': {
    en: ['Plants support food webs; decomposers return nutrients from dead matter to soil.', 'Trace how one change can affect connected organisms.', 'Which ecosystem change or organism is selected?'],
    hi: ['पौधे खाद्य-जाल को सहारा देते हैं; अपघटक मृत पदार्थ से पोषक तत्व मिट्टी में लौटाते हैं।', 'देखें कि एक बदलाव दूसरे जुड़े जीवों को कैसे प्रभावित कर सकता है।', 'कौन-सा पारिस्थितिकी बदलाव या जीव चुना है?'],
  },
  'bio-cell': {
    en: ['Cells are basic units of life; plant and animal cells share some structures and differ in others.', 'Compare the selected structure in plant and animal cells.', 'Which cell type or structure is selected?'],
    hi: ['कोशिकाएँ जीवन की मूल इकाइयाँ हैं; पौधों और जंतुओं की कोशिकाओं में कुछ भाग समान और कुछ अलग होते हैं।', 'पौधे और जंतु कोशिका में चुनी हुई संरचना की तुलना करें।', 'कौन-सी कोशिका या संरचना चुनी है?'],
  },
  'bio-microbes': {
    en: ['Some microorganisms help make food or recycle matter; some can cause disease.', 'Compare the examples without handling any microbes.', 'Which example role is selected?'],
    hi: ['कुछ सूक्ष्मजीव भोजन बनाने या पदार्थों के पुनर्चक्रण में मदद करते हैं; कुछ रोग पैदा कर सकते हैं।', 'सूक्ष्मजीवों को छुए बिना उदाहरणों की तुलना करें।', 'कौन-सी भूमिका चुनी है?'],
  },
  'bio-animal-reproduction': {
    en: ['Animals have varied reproductive strategies; some lay eggs and some give birth to live young.', "Compare the selected animal's stages without assuming every species is the same.", 'Which animal or stage is selected?'],
    hi: ['जंतुओं में प्रजनन के तरीके अलग-अलग होते हैं; कुछ अंडे देते हैं और कुछ सीधे बच्चे जनते हैं।', 'चुने हुए जीव की अवस्थाओं की तुलना करें; सभी प्रजातियाँ एक जैसी नहीं होतीं।', 'कौन-सा जीव या अवस्था चुनी है?'],
  },
  'bio-adolescence': {
    en: ['Adolescence brings changes that happen at different times for different people.', 'For personal concerns, talk with a trusted adult or health professional.', 'Which general development topic is selected?'],
    hi: ['किशोरावस्था में बदलाव अलग-अलग लोगों में अलग समय पर होते हैं।', 'निजी चिंता में भरोसेमंद बड़े या स्वास्थ्य विशेषज्ञ से बात करें।', 'कौन-सा सामान्य विकास विषय चुना है?'],
  },
  'bio-conservation': {
    en: ['Conservation protects organisms and habitats; habitat loss and pollution can threaten biodiversity.', 'Connect the selected action to the habitat or organisms it supports.', 'Which threat or conservation action is selected?'],
    hi: ['संरक्षण जीवों और आवासों की रक्षा करता है; आवास का नाश और प्रदूषण जैव विविधता को खतरा पहुँचा सकते हैं।', 'चुने हुए संरक्षण कार्य को उस आवास या जीव से जोड़ें जिसे इससे मदद मिलती है।', 'कौन-सा खतरा या संरक्षण कार्य चुना है?'],
  },
}

const SAFETY_MESSAGE = {
  en: 'Do not touch, taste, collect, or grow organisms or samples. Tell a teacher or trusted adult about real-world safety concerns.',
  hi: 'जीवों या नमूनों को न छुएँ, न चखें, न इकट्ठा करें और न उगाएँ। वास्तविक सुरक्षा चिंता हो तो शिक्षक या भरोसेमंद बड़े को बताएँ।',
}

function isBiologySafetyQuestion(message: string): boolean {
  return /\b(poison|poisonous|toxic|venom|bite|sting|infection|symptom|diagnos|medicine|medication|treatment|illness|disease|allerg|eat|taste|drink|touch|collect|culture|grow bacteria|mushroom|wild plant|blood)\b|विष|ज़हर|जहर|काट|डस|संक्रमण|बीमारी|दवा|इलाज|लक्षण|खाएँ|खाएं|चख|पिएँ|छुए|इकट्ठा|उगाएँ|मशरूम/i.test(message)
}

export function biologyOfflineHint(moduleId: BiologyTutorModuleId, language: Language, studentMessage: string): TutorResponse {
  if (isBiologySafetyQuestion(studentMessage)) {
    return { message: SAFETY_MESSAGE[language], hint: null, follow_up_question: null, misconception_tag: 'out_of_scope', status: 'fallback' }
  }
  const [message, hint, follow_up_question] = HINTS[moduleId][language]
  return { message, hint, follow_up_question, misconception_tag: null, status: 'fallback' }
}

