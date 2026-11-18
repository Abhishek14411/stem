/* Stable-key UI and lesson translations for the standalone Physics document. */
(() => {
  const common = {
    brand: ['PHYSICS VIRTUAL LAB', 'भौतिकी आभासी प्रयोगशाला'],
    brandSub: ['Explore · Observe · Learn', 'खोजें · देखें · सीखें'],
    offline: ['Offline · virtual models', 'ऑफ़लाइन · आभासी मॉडल'],
    classes: ['Classes', 'कक्षाएँ'], returnClasses: ['Return to class selection', 'कक्षा चयन पर लौटें'],
    welcomeEyebrow: ['A little curiosity goes a long way', 'थोड़ी-सी जिज्ञासा बहुत कुछ सिखाती है'],
    homeTitle: ['Choose a class or topic', 'कक्षा या विषय चुनें'],
    homeIntro: ['Select a class to explore its Physics modules. Choose a topic to make a prediction, investigate the model and review what you discover.', 'अपनी कक्षा के भौतिकी पाठ देखने के लिए कक्षा चुनें। अनुमान लगाएँ, मॉडल की जाँच करें और अपनी खोज को समझें।'],
    navHome: ['Home', 'मुखपृष्ठ'], chooseClass: ['Choose a class', 'कक्षा चुनें'],
    modules: ['modules', 'पाठ'], complete: ['complete', 'पूरे'], quiz: ['Quiz', 'प्रश्नोत्तरी'], notTaken: ['not taken', 'नहीं दी'],
    howTo: ['How to use the lab:', 'प्रयोगशाला का उपयोग:'],
    howToBody: ['First predict and submit. Then change a control or run the model, observe the result and answer the question. These are learning simulations—not real experiments. Progress and quiz scores stay in this browser session; no account or personal details are needed.', 'पहले अनुमान लगाकर जमा करें। फिर कोई नियंत्रण बदलें या मॉडल चलाएँ, परिणाम देखें और प्रश्न का उत्तर दें। ये सीखने के लिए बनाए गए अनुकरण हैं, वास्तविक प्रयोग नहीं। आपकी प्रगति और अंक इसी ब्राउज़र सत्र में रहते हैं; खाते या निजी जानकारी की ज़रूरत नहीं है।'],
    explore: ['Explore', 'जानें'], labSuffix: ['learning lab', 'सीखने की प्रयोगशाला'],
    classQuiz: ['Class quiz', 'कक्षा प्रश्नोत्तरी'], quickCheck: ['Quick check', 'छोटी जाँच'],
    quizIntro: ['Choose an answer for each question. You will see feedback straight away.', 'हर प्रश्न का उत्तर चुनें। आपको तुरंत प्रतिक्रिया मिलेगी।'],
    showDiscoveries: ['Show what you discovered', 'आपने क्या जाना, बताएँ'],
    back: ['Back to', 'वापस जाएँ:'],
    predictionStep: ['1. Make a prediction', '1. अनुमान लगाएँ'], choosePrediction: ['Choose your prediction', 'अपना अनुमान चुनें'],
    predictionSaved: ['Prediction saved:', 'अनुमान सहेजा गया:'],
    predictionAfter: ['Now change a control or run the model and see what happens.', 'अब कोई नियंत्रण बदलें या मॉडल चलाएँ और देखें कि क्या होता है।'],
    submitPrediction: ['Submit prediction', 'अनुमान जमा करें'], investigate: ['2. Investigate', '2. जाँच करें'],
    simulation: ['INTERACTIVE SIMULATION · NOT TO SCALE', 'परस्पर क्रियात्मक अनुकरण · माप के अनुसार नहीं'],
    controls: ['Simulation controls', 'अनुकरण नियंत्रण'], pause: ['Pause', 'रोकें'], run: ['Run', 'चलाएँ'], reset: ['Reset', 'फिर से शुरू करें'],
    compare: ['Compare settings', 'सेटिंग की तुलना करें'], anotherSetting: ['Try another setting', 'दूसरी सेटिंग आज़माएँ'],
    savedSetting: ['Setting A saved. Change a control, then compare.', 'सेटिंग A सहेजी गई। कोई नियंत्रण बदलकर तुलना करें।'],
    saveSetting: ['Save a setting, change a control, then compare two runs.', 'एक सेटिंग सहेजें, नियंत्रण बदलें और दोनों प्रयासों की तुलना करें।'],
    compareEqual: ['The settings are unchanged. Adjust a control before comparing.', 'सेटिंग नहीं बदली है। तुलना से पहले कोई नियंत्रण बदलें।'],
    compareDone: ['Compare the measurements and settings below. Try another setting to begin a new comparison.', 'नीचे माप और सेटिंग की तुलना करें। नई तुलना के लिए दूसरी सेटिंग आज़माएँ।'],
    whatHappening: ['What is happening?', 'क्या हो रहा है?'], noticed: ['What did you notice?', 'आपने क्या देखा?'],
    chooseObservation: ['Choose an observation', 'अपना अवलोकन चुनें'],
    investigationReady: ['Your investigation is ready. Choose an answer and compare it with your prediction.', 'आपकी जाँच पूरी है। उत्तर चुनें और अपने अनुमान से तुलना करें।'],
    investigate: ['2. Investigate', '2. जाँच करें'],
    virtualModel: ['VIRTUAL MODEL', 'आभासी मॉडल'],
    interactiveDiagram: ['interactive diagram', 'परस्पर क्रियात्मक चित्र'],
    changeBeforeAnswer: ['Change a control or press Run before answering.', 'उत्तर देने से पहले नियंत्रण बदलें या चलाएँ दबाएँ।'],
    right: ["That's right.", 'सही उत्तर।'], tryAgainHint: ['Try again. Hint:', 'फिर कोशिश करें। संकेत:'],
    predictionMatched: ['Your prediction matched the model.', 'आपका अनुमान मॉडल के परिणाम से मेल खाता है।'],
    predictionDiffers: ['Your prediction differed from the model. Comparing both is a useful way to learn.', 'आपका अनुमान मॉडल से अलग था। दोनों की तुलना करना सीखने का अच्छा तरीका है।'],
    activityComplete: ['Nice work! Activity complete. Your progress is saved for this session.', 'बहुत अच्छा! गतिविधि पूरी हुई। आपकी प्रगति इस सत्र में सहेजी गई है।'],
    learnMore: ['Learn more', 'और जानें'],
    currentSettings: ['Current settings:', 'वर्तमान सेटिंग:'],
    formulaHeading: ['Live formula and worked example', 'सूत्र और हल किया हुआ उदाहरण'],
    formula: ['Formula or model rule', 'सूत्र या मॉडल का नियम'], substitute: ['Substitute current values', 'वर्तमान मान रखें'],
    result: ['Calculated result', 'गणना का परिणाम'], meaning: ['What it means', 'इसका अर्थ'],
    example: ['Familiar example', 'आसान उदाहरण'], limits: ['Model limits', 'मॉडल की सीमाएँ'],
    currentControls: ['Current controls (some may be inactive in this view)', 'वर्तमान नियंत्रण (कुछ इस दृश्य में निष्क्रिय हो सकते हैं)'],
    completeAria: ['modules completed', 'पाठ पूरे'],
    grade6Description: ['Discover motion, light, simple circuits and magnets.', 'गति, प्रकाश, सरल परिपथ और चुंबकों को जानें।'],
    grade7Description: ['Explore heat, motion and time, current effects and light.', 'ऊष्मा, गति और समय, धारा के प्रभाव तथा प्रकाश की खोज करें।'],
    grade8Description: ['Investigate electricity, forces, weather, sound, light and natural phenomena.', 'विद्युत, बल, मौसम, ध्वनि, प्रकाश और प्राकृतिक घटनाओं की जाँच करें।'],
    animationRunning: ['Animation running', 'एनिमेशन चल रहा है'], readyExplore: ['Ready to explore', 'खोजने के लिए तैयार'],
    correct: ['Correct!', 'सही!'], notQuite: ['Not quite.', 'अभी सही नहीं।'],
    quizComplete: ['Quiz complete:', 'प्रश्नोत्तरी पूरी:'], outOf: ['out of', 'में से'],
    brilliant: ['Brilliant work!', 'बहुत बढ़िया!'], review: ['Review the explanations, then explore the lab again.', 'व्याख्याएँ पढ़ें और फिर प्रयोगशाला देखें।'],
    retryQuiz: ['Try again', 'फिर कोशिश करें'], question: ['Question', 'प्रश्न'],
    noFormula: ['No formula is available for this simulation.', 'इस अनुकरण के लिए कोई सूत्र उपलब्ध नहीं है।'],
    conductor: ['conductor', 'चालक'], insulator: ['insulator', 'कुचालक'],
    closed: ['Closed', 'बंद'], open: ['Open', 'खुला'],
    settingASaved: ['Setting A saved. Change at least one control, then compare.', 'सेटिंग A सहेजी गई। तुलना करने से पहले कम से कम एक नियंत्रण बदलें।'],
    settingsUnchanged: ['The settings are unchanged. Adjust a control before comparing.', 'सेटिंग नहीं बदली है। तुलना से पहले कोई नियंत्रण बदलें।'],
    compareBelow: ['Compare the measurements and settings below. Try another setting to begin a new comparison.', 'नीचे माप और सेटिंग की तुलना करें। नई तुलना के लिए दूसरी सेटिंग आज़माएँ।'],
    compareHeading: ['Compare your settings', 'अपनी सेटिंग की तुलना करें'],
    settingA: ['Setting A', 'सेटिंग A'],
    settingB: ['Setting B', 'सेटिंग B'],
    pausedExplore: ['Paused · ready to explore', 'रुका हुआ · देखने के लिए तैयार'],
    investigationPromptReady: ['Your investigation is ready. Choose an answer and compare it with your prediction.', 'आपकी जाँच पूरी है। उत्तर चुनें और अपने अनुमान से तुलना करें।'],
    completeCount: ['complete', 'पूरे'],
    onWord: ['ON', 'चालू'],
    offWord: ['OFF', 'बंद'],
  }

  const modules = {
    'motion-distance': {
      title:['Motion and Measurement of Distances','गति और दूरी का मापन'],short:['Motion & measuring distance','गति और दूरी का मापन'],
      intro:["Motion is a change in an object's position. Explore a straight track, a circular path and a repeating back-and-forth journey; use the marks to compare distance.",'गति किसी वस्तु की स्थिति में बदलाव है। सीधा पथ, वृत्ताकार पथ और आगे-पीछे की गति देखें। निशानों से दूरी की तुलना करें।'],
      observation:['How does the marked distance change when you change the speed or choose a different kind of path?','चाल बदलने या अलग पथ चुनने पर चिह्नित दूरी में क्या बदलाव आता है?'],
      note:['A diagrammatic model: the moving marker stands for an object. A metre (m) is the SI unit of length.','यह चित्रात्मक मॉडल है; चलता हुआ निशान वस्तु को दिखाता है। मीटर (m) लंबाई की SI इकाई है।'],
      learn:['A ruler is useful for short lengths; a measuring tape can follow curves; a metre scale is one metre long. Smaller lengths may be written in centimetres (cm) or millimetres (mm).','छोटी लंबाई के लिए पैमाना उपयोगी है और घुमावदार दूरी के लिए मापने वाला फीता। मीटर पैमाना एक मीटर लंबा होता है। छोटी लंबाइयाँ सेंटीमीटर (cm) या मिलीमीटर (mm) में लिखी जा सकती हैं।'],
      pred:['If the object moves faster on the same track, what do you predict?','यदि वस्तु उसी पथ पर तेज़ चले, तो आपका अनुमान क्या है?',['It will reach the end sooner.','The measured track will get longer.'],['वह जल्दी अंत तक पहुँचेगी।','मापे गए पथ की लंबाई बढ़ जाएगी।']],
      check:['If speed increases on the same straight track, what happens?','उसी सीधे पथ पर चाल बढ़ाने से क्या होगा?',['The object reaches the end sooner.','The track becomes longer.'],['वस्तु जल्दी अंत तक पहुँचेगी।','पथ लंबा हो जाएगा।'],'Speed changes how quickly the object moves. The marked track length stays the same.','चाल बदलने से वस्तु कितनी जल्दी चलती है, यह बदलता है। पथ की चिह्नित लंबाई वही रहती है।'],
      hint:['Think about speed as how quickly position changes; the track marks are fixed.','चाल बताती है कि स्थिति कितनी जल्दी बदलती है; पथ के निशान स्थिर हैं।'],
    },
    'light-shadow': {
      title:['Light, Shadows and Reflections','प्रकाश, छाया और परावर्तन'],short:['Light, shadows & reflection','प्रकाश, छाया और परावर्तन'],
      intro:['Luminous objects make their own light. We see non-luminous objects when light reflects from them. Try different materials and follow how light forms a shadow.','प्रदीप्त वस्तुएँ अपना प्रकाश बनाती हैं। अप्रदीप्त वस्तुएँ हमें तब दिखती हैं जब उनसे प्रकाश परावर्तित होता है। अलग पदार्थों से देखें कि छाया कैसे बनती है।'],
      observation:['What happens to the shadow when the object moves closer to the screen? What changes with each material?','वस्तु को पर्दे के पास ले जाने पर छाया में क्या होता है? अलग-अलग पदार्थों से क्या बदलता है?'],
      note:['Light rays are drawn as straight lines. This simplified sketch is not to scale.','प्रकाश किरणों को सीधी रेखाओं से दिखाया गया है। यह सरल चित्र माप के अनुसार नहीं है।'],
      learn:['Transparent materials let most light pass through; translucent materials scatter some light; opaque materials block light. A pinhole camera forms an upside-down image. A plane mirror makes an upright virtual image with left and right reversed (lateral inversion).','पारदर्शी पदार्थ अधिकांश प्रकाश को गुजरने देते हैं; पारभासी पदार्थ कुछ प्रकाश बिखेरते हैं; अपारदर्शी पदार्थ प्रकाश रोकते हैं। पिनहोल कैमरा उल्टा प्रतिबिंब बनाता है। समतल दर्पण सीधा आभासी प्रतिबिंब बनाता है, जिसमें दायाँ-बायाँ उलट जाता है (पार्श्व परिवर्तन)।'],
      pred:['What do you predict an opaque object will do to the light?','अपारदर्शी वस्तु प्रकाश के साथ क्या करेगी?',['Block most light and make a dark shadow.','Let nearly all the light pass through.'],['अधिकांश प्रकाश रोककर गहरी छाया बनाएगी।','लगभग सारा प्रकाश गुजरने देगी।']],
      check:['Which material blocks most light and makes the clearest shadow?','कौन-सा पदार्थ सबसे अधिक प्रकाश रोककर स्पष्ट छाया बनाता है?',['Opaque material','Transparent material'],['अपारदर्शी पदार्थ','पारदर्शी पदार्थ'],'Opaque materials block light. Transparent materials let most light pass through.','अपारदर्शी पदार्थ प्रकाश रोकते हैं। पारदर्शी पदार्थ अधिकांश प्रकाश को गुजरने देते हैं।'],
      hint:['Ask whether the material lets light pass or blocks it.','सोचें कि पदार्थ प्रकाश को गुजरने देता है या रोकता है।'],
    },
    'electric-circuits': {
      title:['Electricity and Circuits','विद्युत और परिपथ'],short:['Electricity & circuits','विद्युत और परिपथ'],
      intro:['A bulb lights when it is connected in a complete, closed circuit. Explore a virtual cell, wires, bulb and switch; then test which sample materials conduct electricity.','बल्ब तब जलता है जब वह पूरे और बंद विद्युत परिपथ से जुड़ा हो। आभासी सेल, तार, बल्ब और स्विच देखें; फिर जाँचें कि कौन-से नमूना पदार्थ विद्युत का चालन करते हैं।'],
      observation:['Does the bulb glow when the switch is open? Which tested materials complete the virtual path?','स्विच खुला होने पर क्या बल्ब जलता है? जाँचे गए किन पदार्थों से आभासी परिपथ पूरा होता है?'],
      note:['This is a low-voltage diagram, not a real wiring activity. Never experiment with mains electricity.','यह कम वोल्टेज का चित्र है, वास्तविक वायरिंग गतिविधि नहीं। मुख्य विद्युत आपूर्ति के साथ कभी प्रयोग न करें।'],
      learn:['A cell provides electrical energy, connecting wires make a path, the bulb changes electrical energy to light, and a switch opens or closes the path. Metals usually conduct; rubber and many plastics are insulators.','सेल विद्युत ऊर्जा देता है, जोड़ने वाले तार मार्ग बनाते हैं, बल्ब विद्युत ऊर्जा को प्रकाश में बदलता है और स्विच मार्ग खोलता या बंद करता है। धातुएँ आमतौर पर चालक होती हैं; रबर और कई प्लास्टिक कुचालक होते हैं।'],
      pred:['What do you predict when the switch is closed and copper fills the gap?','स्विच बंद हो और खाली जगह में ताँबा हो, तो आपका अनुमान क्या है?',['The bulb will light.','The bulb will stay dark.'],['बल्ब जलेगा।','बल्ब नहीं जलेगा।']],
      check:['What lets the bulb glow in this circuit?','इस परिपथ में बल्ब किससे जलता है?',['A closed path with a conducting sample','An open switch and an insulating sample'],['चालक नमूने वाला बंद मार्ग','खुला स्विच और कुचालक नमूना'],'Current needs a complete path, and the test material must conduct for this series circuit to light.','इस श्रेणी परिपथ में धारा के लिए पूरा मार्ग और चालक पदार्थ आवश्यक है।'],
      hint:['Check both parts: is the path closed, and does copper conduct?','दोनों बातें जाँचें: क्या मार्ग बंद है और क्या ताँबा चालक है?'],
    },
    magnets: {
      title:['Fun with Magnets','चुंबकों के साथ रोचक खोज'],short:['Fun with magnets','चुंबकों के साथ खोज'],
      intro:['Magnets may occur naturally or be made by people. Explore poles, test familiar materials, and see how a compass needle responds to a nearby magnet.','चुंबक प्राकृतिक रूप से मिल सकते हैं या बनाए जा सकते हैं। ध्रुवों को देखें, आम पदार्थों की जाँच करें और पास के चुंबक पर दिशा-सूचक सुई की प्रतिक्रिया देखें।'],
      observation:['Which materials are attracted? What happens when like poles face, compared with unlike poles?','कौन-से पदार्थ आकर्षित होते हैं? समान और विपरीत ध्रुव आमने-सामने हों तो क्या होता है?'],
      note:['The magnetic field lines in this picture are a simplified drawing; a compass aligns with the field.','इस चित्र की चुंबकीय क्षेत्र रेखाएँ सरल रूप में दिखाई गई हैं; दिशा-सूचक क्षेत्र के अनुरूप होता है।'],
      learn:['Like poles repel and unlike poles attract. A compass needle is a small magnet. Natural lodestone is magnetic; bar magnets and horseshoe magnets are made in many shapes. Keep magnets away from delicate electronics and magnetic cards; store suitable bar magnets in pairs with soft-iron keepers.','समान ध्रुव प्रतिकर्षित और विपरीत ध्रुव आकर्षित होते हैं। दिशा-सूचक की सुई एक छोटा चुंबक है। प्राकृतिक चुम्बक-पत्थर चुंबकीय होता है; छड़ और घोड़े की नाल जैसे चुंबक कई आकारों में बनाए जाते हैं। चुंबकों को नाज़ुक इलेक्ट्रॉनिक वस्तुओं और चुंबकीय कार्ड से दूर रखें; उपयुक्त छड़ चुंबकों को नरम लोहे के रक्षक के साथ जोड़े में रखें।'],
      pred:['What do you predict when two north poles face each other?','दो उत्तरी ध्रुव आमने-सामने हों तो आपका अनुमान क्या है?',['They will push apart.','They will pull together.'],['वे एक-दूसरे को दूर धकेलेंगे।','वे एक-दूसरे को खींचेंगे।']],
      check:['What happens when two like poles face each other?','दो समान ध्रुव आमने-सामने हों तो क्या होता है?',['They repel.','They attract.'],['वे प्रतिकर्षित होते हैं।','वे आकर्षित होते हैं।'],'Like poles repel; unlike poles attract.','समान ध्रुव प्रतिकर्षित और विपरीत ध्रुव आकर्षित होते हैं।'],
      hint:['Compare the names of the two facing poles.','आमने-सामने के दोनों ध्रुवों के नामों की तुलना करें।'],
    },
    heat: {
      title:['Heat','ऊष्मा'],short:['Heat','ऊष्मा'],
      intro:['Temperature tells us how hot or cold something is, measured here in degrees Celsius (°C). Compare safe, virtual examples of heat transfer—no real hot objects are used.','तापमान बताता है कि कोई वस्तु कितनी गर्म या ठंडी है; यहाँ इसे डिग्री सेल्सियस (°C) में मापा जाता है। ऊष्मा के स्थानांतरण के सुरक्षित आभासी उदाहरण देखें—यहाँ कोई असली गर्म वस्तु नहीं है।'],
      observation:['How does the transfer pattern differ for conduction, convection and radiation? Which surface absorbs more radiation?','चालन, संवहन और विकिरण में स्थानांतरण का तरीका कैसे अलग है? कौन-सी सतह अधिक विकिरण सोखती है?'],
      note:['The animation is conceptual. It does not show real temperatures or require touching hot objects.','यह एनिमेशन अवधारणा समझाता है। इसमें वास्तविक तापमान नहीं दिखता और गर्म वस्तु छूने की ज़रूरत नहीं है।'],
      learn:['A clinical thermometer is designed to measure body temperature; a laboratory thermometer measures temperatures in experiments and should be read while its bulb is in the sample. Conduction transfers heat through touching particles, convection by moving fluids, and radiation by waves. Dark surfaces absorb more radiant energy than light ones.','चिकित्सीय थर्मामीटर शरीर का तापमान मापता है; प्रयोगशाला थर्मामीटर प्रयोगों में तापमान मापता है और उसका बल्ब नमूने में रखते हुए पढ़ना चाहिए। चालन में छूते कणों से, संवहन में गतिशील द्रव से और विकिरण में तरंगों से ऊष्मा पहुँचती है। गहरे रंग की सतहें हल्के रंग की सतहों से अधिक विकिरण ऊर्जा सोखती हैं।'],
      pred:['Which surface do you predict will absorb more radiant energy?','आपके अनुसार कौन-सी सतह अधिक विकिरण ऊर्जा सोखेगी?',['The dark surface.','The light surface.'],['गहरी सतह।','हल्की सतह।']],
      check:['Which surface absorbs more radiant energy?','कौन-सी सतह अधिक विकिरण ऊर्जा सोखती है?',['A dark surface','A light surface'],['गहरी सतह','हल्की सतह'],'Dark surfaces generally absorb more radiant energy than light surfaces.','गहरी सतहें आमतौर पर हल्की सतहों से अधिक विकिरण ऊर्जा सोखती हैं।'],
      hint:['Think about which colour takes in more energy from radiation.','सोचें कि कौन-सा रंग विकिरण से अधिक ऊर्जा ग्रहण करता है।'],
    },
    'motion-time': {
      title:['Motion and Time','गति और समय'],short:['Motion & time','गति और समय'],
      intro:['Speed compares distance with time: speed = distance ÷ time. Change the values and compare the slopes on a distance–time graph. A simple pendulum also shows repeating motion.','चाल दूरी और समय की तुलना करती है: चाल = दूरी ÷ समय। मान बदलकर दूरी-समय ग्राफ की ढलानों की तुलना करें। सरल लोलक दोहराई जाने वाली गति भी दिखाता है।'],
      observation:["How does the graph's slope change when speed increases? What happens to a pendulum's period when its length increases?",'चाल बढ़ने पर ग्राफ की ढलान कैसे बदलती है? लंबाई बढ़ाने पर लोलक के आवर्तकाल पर क्या असर होता है?'],
      note:['The pendulum uses a small-angle model. The distance–time graph assumes steady speed.','लोलक छोटे कोण का मॉडल है। दूरी-समय ग्राफ में चाल स्थिर मानी गई है।'],
      learn:['Time is measured in seconds (s), minutes (min) or hours (h). Speed is often measured in metres per second (m/s) or kilometres per hour (km/h). For a small swing, a longer pendulum takes more time for one complete oscillation: T â‰ˆ 2π√(L/g).','समय सेकंड (s), मिनट (min) या घंटे (h) में मापा जाता है। चाल अक्सर मीटर प्रति सेकंड (m/s) या किलोमीटर प्रति घंटा (km/h) में मापी जाती है। छोटे झूले के लिए लंबे लोलक को एक पूरा दोलन करने में अधिक समय लगता है: T â‰ˆ 2Ï€âˆš(L/g)।'],
      pred:['What do you predict if the pendulum is made longer?','लोलक लंबा करने पर आपका अनुमान क्या है?',['It will take more time for a swing.','It will take less time for a swing.'],['एक झूले में अधिक समय लगेगा।','एक झूले में कम समय लगेगा।']],
      check:['What happens when you make the pendulum longer?','लोलक को लंबा करने पर क्या होता है?',['Its period gets longer; it swings more slowly.','Its period gets shorter; it swings faster.'],['आवर्तकाल बढ़ता है; यह धीरे झूलता है।','आवर्तकाल घटता है; यह तेज़ झूलता है।'],'For small swings, period is proportional to the square root of length. A longer pendulum takes more time for one swing.','छोटे झूलों में आवर्तकाल लंबाई के वर्गमूल के समानुपाती होता है। लंबा लोलक एक झूले में अधिक समय लेता है।'],
      hint:['A longer pendulum swings more slowly.','लंबा लोलक अधिक धीरे झूलता है।'],
    },
    'current-effects': {
      title:['Electric Current and Its Effects','विद्युत धारा और उसके प्रभाव'],short:['Current & its effects','धारा और उसके प्रभाव'],
      intro:['Current can heat a wire and create a magnetic effect. Explore familiar circuit symbols, a conceptual fuse, an electromagnet and an electric bell—entirely in simulation.','विद्युत धारा तार को गर्म कर सकती है और चुंबकीय प्रभाव पैदा कर सकती है। परिपथ के चिह्न, फ्यूज़, विद्युत चुंबक और बिजली की घंटी को आभासी मॉडल में देखें।'],
      observation:['What changes when more current flows? How does the electromagnet change when the coil has more turns?','धारा बढ़ने पर क्या बदलता है? कुंडली के फेरे बढ़ाने पर विद्युत चुंबक में क्या बदलाव आता है?'],
      note:['Virtual low-voltage model only. A fuse is a safety device; never connect this diagram to a mains supply.','केवल कम वोल्टेज का आभासी मॉडल। फ्यूज़ सुरक्षा यंत्र है; इस चित्र को मुख्य विद्युत आपूर्ति से कभी न जोड़ें।'],
      learn:['A fuse melts and breaks a circuit if excessive current flows. An electromagnet is a coil carrying current, often wrapped around an iron core. In an electric bell, an electromagnet attracts a moving arm, repeatedly making and breaking contact.','अत्यधिक धारा बहने पर फ्यूज़ पिघलकर परिपथ तोड़ देता है। विद्युत चुंबक धारा-वाहित कुंडली होती है, जो अक्सर लोहे की क्रोड पर लिपटी होती है। बिजली की घंटी में विद्युत चुंबक चलती भुजा को खींचता है और संपर्क बार-बार जुड़ता-टूटता है।'],
      pred:['What do you predict a fuse does when too much current flows?','बहुत अधिक धारा बहने पर फ्यूज़ क्या करता है?',['It melts and breaks the circuit.','It lets extra current keep flowing.'],['वह पिघलकर परिपथ तोड़ देता है।','वह अतिरिक्त धारा बहने देता है।']],
      check:['What does a fuse do if too much current flows?','बहुत अधिक धारा बहने पर फ्यूज़ क्या करता है?',['It melts and breaks the circuit.','It adds more current to the circuit.'],['वह पिघलकर परिपथ तोड़ देता है।','वह परिपथ में और धारा जोड़ता है।'],'A fuse is designed to melt and interrupt the circuit when current is excessive.','धारा बहुत अधिक होने पर फ्यूज़ पिघलकर परिपथ को तोड़ने के लिए बनाया जाता है।'],
      hint:['A fuse is a safety link that opens the path when current is too large.','फ्यूज़ सुरक्षा कड़ी है; धारा बहुत अधिक होने पर यह मार्ग खोल देता है।'],
    },
    light: {
      title:['Light','प्रकाश'],short:['Light','प्रकाश'],
      intro:['Light reflects from mirrors and bends when it passes between materials. Explore a ray sketch for mirrors and lenses, or split white light into the colours of a rainbow.','दर्पण से प्रकाश परावर्तित होता है और पदार्थों के बीच से गुजरते समय मुड़ता है। दर्पण और लेंस के किरण चित्र देखें या सफेद प्रकाश को इंद्रधनुष के रंगों में बाँटें।'],
      observation:['How does the image differ when you switch the optical element? What do the prism colours tell you about white light?','प्रकाशीय उपकरण बदलने पर प्रतिबिंब कैसे बदलता है? प्रिज़्म के रंग सफेद प्रकाश के बारे में क्या बताते हैं?'],
      note:['Ray diagrams are simplified and not to scale; curved optical surfaces are drawn schematically.','किरण चित्र सरल हैं और माप के अनुसार नहीं हैं; वक्र प्रकाशीय सतहें संकेत रूप में बनी हैं।'],
      learn:['A plane mirror forms an upright virtual image of the same size, apparently as far behind the mirror as the object is in front. A concave mirror or convex lens can form a real image when the object is beyond the focus; a convex mirror and concave lens form upright, smaller virtual images. A prism separates white light into a spectrum of seven colours.','समतल दर्पण समान आकार का सीधा आभासी प्रतिबिंब बनाता है; प्रतिबिंब दर्पण के पीछे उतनी ही दूरी पर दिखता है जितनी दूरी पर वस्तु सामने है। वस्तु फोकस से बाहर हो तो अवतल दर्पण या उत्तल लेंस वास्तविक प्रतिबिंब बना सकता है; उत्तल दर्पण और अवतल लेंस छोटे, सीधे आभासी प्रतिबिंब बनाते हैं। प्रिज़्म सफेद प्रकाश को सात रंगों के वर्णक्रम में बाँटता है।'],
      pred:['What do you predict white light does in a prism?','प्रिज़्म में सफेद प्रकाश क्या करेगा?',['Spreads into a band of colours.','Stops at the prism.'],['रंगों की पट्टी में फैल जाएगा।','प्रिज़्म पर रुक जाएगा।']],
      check:['What happens when white light passes through a prism?','सफेद प्रकाश प्रिज़्म से गुजरने पर क्या होता है?',['It spreads into a spectrum of colours.','It stops travelling at the prism.'],['वह रंगों के वर्णक्रम में फैल जाता है।','वह प्रिज़्म पर चलना बंद कर देता है।'],'A prism separates white light into a spectrum of colours.','प्रिज़्म सफेद प्रकाश को रंगों के वर्णक्रम में बाँटता है।'],
      hint:['A prism bends different colours of white light by different amounts.','प्रिज़्म सफेद प्रकाश के अलग-अलग रंगों को अलग मात्रा में मोड़ता है।'],
    },
    'electric-effects': {
      title:['Electricity: Heating, Magnetic, and Chemical Effects','विद्युत: ऊष्मीय, चुंबकीय और रासायनिक प्रभाव'],short:['Electricity: three effects','विद्युत के तीन प्रभाव'],
      intro:['Electric current can produce heating, magnetic and chemical effects. Explore a virtual circuit and see how a conducting liquid can support electroplating.','विद्युत धारा ऊष्मीय, चुंबकीय और रासायनिक प्रभाव पैदा कर सकती है। आभासी परिपथ देखें और जानें कि चालक द्रव विद्युत-लेपन में कैसे मदद कर सकता है।'],
      observation:['Which sample liquid allows current in this model? What changes on the object when the electroplating activity is selected?','इस मॉडल में कौन-सा द्रव धारा बहने देता है? विद्युत-लेपन चुनने पर वस्तु में क्या बदलाव आता है?'],
      note:['Conceptual simulation only. Do not handle real electricity or chemicals. Sample results are simplified examples.','केवल अवधारणा समझाने वाला अनुकरण। वास्तविक बिजली या रसायनों को न छुएँ। नमूना परिणाम सरल उदाहरण हैं।'],
      learn:['Some liquids conduct because they contain charged particles. When current passes through a suitable solution, chemical changes can happen. In electroplating, a thin metal coating is deposited on an object. The model shows the idea only; real electroplating requires trained supervision and safe equipment.','कुछ द्रवों में आवेशित कण होने के कारण वे विद्युत का चालन करते हैं। उपयुक्त घोल में धारा बहने पर रासायनिक बदलाव हो सकते हैं। विद्युत-लेपन में वस्तु पर धातु की पतली परत चढ़ाई जाती है। यह मॉडल केवल विचार समझाता है; वास्तविक विद्युत-लेपन प्रशिक्षित निगरानी और सुरक्षित उपकरणों से ही करें।'],
      pred:['What do you predict in the electroplating model with a closed switch and conducting liquid?','बंद स्विच और चालक द्रव वाले विद्युत-लेपन मॉडल में आपका अनुमान क्या है?',['A thin coating builds on the object.','The liquid prevents all change.'],['वस्तु पर पतली परत चढ़ेगी।','द्रव हर बदलाव रोक देगा।']],
      check:['What can happen when current passes through a conducting liquid?','चालक द्रव से धारा गुजरने पर क्या हो सकता है?',['The liquid can conduct current and chemical changes may occur.','The liquid always becomes an insulator.'],['द्रव धारा बहा सकता है और रासायनिक बदलाव हो सकते हैं।','द्रव हमेशा कुचालक बन जाता है।'],'Some liquids conduct; chemical effects can happen in a suitable conducting solution.','कुछ द्रव चालक होते हैं; उपयुक्त चालक घोल में रासायनिक प्रभाव हो सकते हैं।'],
      hint:['In electroplating, current can move metal from a solution onto an object.','विद्युत-लेपन में धारा घोल से धातु को वस्तु पर जमा कर सकती है।'],
    },
    forces: {
      title:['Exploring Forces','बलों की खोज'],short:['Exploring forces','बलों की खोज'],
      intro:['A force is a push or pull. It can change an object\'s motion or shape. Compare contact forces, such as a push or friction, with forces that act without touching.','बल धक्का या खिंचाव है। यह वस्तु की गति या आकार बदल सकता है। धक्का और घर्षण जैसे संपर्क बलों की तुलना बिना छुए लगने वाले बलों से करें।'],
      observation:['Which forces need touching? Which can act across a gap? How does friction change the moving object\'s motion?','किन बलों के लिए संपर्क चाहिए? कौन-से दूरी से लग सकते हैं? घर्षण चलती वस्तु की गति कैसे बदलता है?'],
      note:['Arrows show force direction and relative size, not exact measured forces.','तीर बल की दिशा और सापेक्ष परिमाण दिखाते हैं, सटीक माप नहीं।'],
      learn:['Muscular force and friction are contact forces. Magnetic, electrostatic and gravitational forces are non-contact forces. Friction usually opposes sliding; a rougher surface often creates more friction. Gravity pulls objects towards Earth.','पेशीय बल और घर्षण संपर्क बल हैं। चुंबकीय, स्थिर-वैद्युत और गुरुत्वाकर्षण बल असंपर्क बल हैं। घर्षण आमतौर पर फिसलने का विरोध करता है; खुरदरी सतह पर अक्सर अधिक घर्षण होता है। गुरुत्व वस्तुओं को पृथ्वी की ओर खींचता है।'],
      pred:['What do you predict roughness does to friction?','खुरदरापन घर्षण पर क्या असर डालेगा?',['A rougher surface usually increases friction.','A rougher surface removes friction.'],['खुरदरी सतह आमतौर पर घर्षण बढ़ाती है।','खुरदरी सतह घर्षण हटा देती है।']],
      check:['For the same force, what happens if its area of contact gets larger?','समान बल के लिए संपर्क क्षेत्र बढ़ाने पर क्या होता है?',['Pressure gets smaller.','Pressure gets larger.'],['दाब कम होता है।','दाब बढ़ता है।'],'Pressure is force divided by area. Spreading the same force over more area lowers pressure.','दाब = बल ÷ क्षेत्रफल। समान बल को बड़े क्षेत्र में फैलाने से दाब घटता है।'],
      hint:['Friction acts where surfaces touch and usually resists sliding.','घर्षण संपर्क में आई सतहों पर लगता है और आमतौर पर फिसलने का विरोध करता है।'],
    },
    'pressure-weather': {
      title:['Pressure, Winds, Storms, and Cyclones','दाब, पवन, तूफ़ान और चक्रवात'],short:['Pressure, wind & cyclones','दाब, पवन और चक्रवात'],
      intro:['Pressure is force spread over an area: pressure = force ÷ area. Explore surface pressure, fluid pressure, wind currents and a conceptual cyclone.','दाब किसी क्षेत्रफल पर लगने वाला बल है: दाब = बल ÷ क्षेत्रफल। सतही दाब, द्रव दाब, वायु धाराएँ और चक्रवात का वैचारिक मॉडल देखें।'],
      observation:['How does pressure change when you spread the same force over a larger area? How does fluid pressure change with depth?','समान बल को बड़े क्षेत्र में फैलाने पर दाब कैसे बदलता है? गहराई के साथ द्रव दाब कैसे बदलता है?'],
      note:['Weather drawings are simplified learning models, not forecasts or warnings. Follow local emergency guidance in real storms.','मौसम के चित्र सरल शिक्षण मॉडल हैं, पूर्वानुमान या चेतावनी नहीं। वास्तविक तूफ़ान में स्थानीय आपात निर्देश मानें।'],
      learn:['For the same force, a smaller area means greater pressure. Air around us also exerts atmospheric pressure. Fluids exert pressure in all directions, and pressure increases with depth. Uneven heating of air can create convection currents and winds. A cyclone is a rotating storm around a low-pressure centre; this model does not predict weather. During severe weather, shelter indoors and follow official local advice.','समान बल के लिए छोटा क्षेत्रफल अधिक दाब देता है। हमारे चारों ओर की हवा वायुमंडलीय दाब भी डालती है। द्रव सभी दिशाओं में दाब डालते हैं और गहराई बढ़ने पर दाब बढ़ता है। हवा का असमान गर्म होना संवहन धाराएँ और पवन बना सकता है। चक्रवात कम दाब के केंद्र के चारों ओर घूमता तूफ़ान है; यह मॉडल मौसम का पूर्वानुमान नहीं करता। गंभीर मौसम में घर के भीतर सुरक्षित रहें और स्थानीय आधिकारिक सलाह मानें।'],
      pred:['With the same force, what do you predict if the contact area increases?','समान बल में संपर्क क्षेत्र बढ़े तो आपका अनुमान क्या है?',['Pressure decreases.','Pressure increases.'],['दाब घटेगा।','दाब बढ़ेगा।']],
      check:['At the same force, what does a larger contact area do to pressure?','समान बल पर बड़ा संपर्क क्षेत्र दाब को कैसे बदलता है?',['It lowers the pressure.','It raises the pressure.'],['यह दाब घटाता है।','यह दाब बढ़ाता है।'],'Pressure = force ÷ area, so a larger area gives lower pressure for the same force.','दाब = बल ÷ क्षेत्रफल, इसलिए समान बल पर बड़ा क्षेत्रफल कम दाब देता है।'],
      hint:['Use pressure = force divided by area.','दाब = बल ÷ क्षेत्रफल का उपयोग करें।'],
    },
    sound: {
      title:['Sound','ध्वनि'],short:['Sound','ध्वनि'],
      intro:['Sound begins with vibrations and travels through a medium such as air, water or a solid. Adjust frequency and amplitude to explore pitch and loudness.','ध्वनि कंपन से शुरू होती है और हवा, पानी या ठोस जैसे माध्यम से चलती है। तारत्व और प्रबलता जानने के लिए आवृत्ति और आयाम बदलें।'],
      observation:['How does frequency affect pitch? How does amplitude affect loudness? What happens to sound when there is no medium?','आवृत्ति तारत्व को कैसे बदलती है? आयाम प्रबलता को कैसे बदलता है? माध्यम न हो तो ध्वनि का क्या होता है?'],
      note:['Wave shape and loudness are illustrative, not calibrated sound measurements. Keep real listening volumes comfortable.','तरंग का आकार और प्रबलता केवल उदाहरण हैं, मापे हुए ध्वनि स्तर नहीं। वास्तविक ध्वनि सुनते समय सुरक्षित स्तर रखें।'],
      learn:['Frequency is the number of vibrations each second; higher frequency usually means higher pitch. Larger amplitude usually means louder sound. The voice box (larynx) vibrates to make voice. The outer ear collects sound; the eardrum vibrates and the tiny middle-ear bones pass that motion to the inner ear (cochlea), which sends signals along the auditory nerve. Sound cannot travel through a vacuum. Human hearing is roughly 20 Hz to 20,000 Hz; infrasound is below that range and ultrasound is above it. Very loud noise can harm hearing.','आवृत्ति प्रति सेकंड कंपन की संख्या है; अधिक आवृत्ति का अर्थ आमतौर पर ऊँचा तारत्व है। अधिक आयाम का अर्थ आमतौर पर तेज़ ध्वनि है। स्वरयंत्र कंपन करके आवाज़ बनाता है। बाहरी कान ध्वनि ग्रहण करता है; कान का पर्दा कंपन करता है और मध्य-कान की छोटी हड्डियाँ कंपन को भीतरी कान (कर्णावर्त) तक पहुँचाती हैं, जहाँ से श्रवण तंत्रिका संकेत भेजती है। निर्वात में ध्वनि नहीं चल सकती। मनुष्य लगभग 20 Hz से 20,000 Hz तक सुन सकता है; इससे कम अवश्रव्य और अधिक पराश्रव्य ध्वनि है। बहुत तेज़ शोर सुनने की क्षमता को नुकसान पहुँचा सकता है।'],
      pred:['What do you predict sound does when there is no material medium?','भौतिक माध्यम न हो तो ध्वनि क्या करेगी?',['It cannot travel.','It travels just as it does through air.'],['वह नहीं चल सकती।','वह हवा की तरह ही चलती है।']],
      check:['Can sound travel when there is no material medium?','भौतिक माध्यम न हो तो क्या ध्वनि चल सकती है?',['No. Sound needs a medium.','Yes. Sound travels through empty space.'],['नहीं। ध्वनि को माध्यम चाहिए।','हाँ। ध्वनि खाली अंतरिक्ष में चलती है।'],'Sound is a vibration passed through particles, so it cannot travel through a vacuum.','ध्वनि कणों के माध्यम से आगे बढ़ने वाला कंपन है, इसलिए वह निर्वात में नहीं चल सकती।'],
      hint:['Sound is a vibration passed from particle to particle.','ध्वनि कण से कण तक पहुँचने वाला कंपन है।'],
    },
    'reflection-eye': {
      title:['Light: Reflection and the Human Eye','प्रकाश: परावर्तन और मानव नेत्र'],short:['Reflection & the human eye','परावर्तन और मानव नेत्र'],
      intro:['Smooth surfaces reflect light in an orderly way; rough surfaces scatter it. Explore two mirrors and see a simple diagram of how the eye focuses light.','चिकनी सतहें प्रकाश को नियमित रूप से परावर्तित करती हैं; खुरदरी सतहें उसे बिखेरती हैं। दो दर्पण देखें और आँख में प्रकाश केंद्रित होने का सरल चित्र देखें।'],
      observation:['What happens to the number of reflected images as the mirror angle gets smaller? How does roughness change reflection?','दर्पणों के बीच कोण घटने पर प्रतिबिंबों की संख्या कैसे बदलती है? खुरदरापन परावर्तन को कैसे बदलता है?'],
      note:['Mirror-image counts are ideal geometry; eye diagram is simplified and not to scale.','दर्पण प्रतिबिंबों की संख्या आदर्श ज्यामिति पर आधारित है; आँख का चित्र सरल है और माप के अनुसार नहीं।'],
      learn:['The cornea and lens bend light to focus an image on the retina. The iris controls pupil size; the optic nerve carries signals to the brain. Read in good light, take screen breaks, and never look directly at the Sun or bright lasers. Regular reflection comes from a smooth surface; a rough surface scatters reflected rays.','स्वच्छमंडल और लेंस प्रकाश को मोड़कर दृष्टिपटल पर प्रतिबिंब केंद्रित करते हैं। परितारिका पुतली का आकार नियंत्रित करती है; दृष्टि तंत्रिका संकेत मस्तिष्क तक ले जाती है। अच्छी रोशनी में पढ़ें, स्क्रीन से बीच-बीच में विराम लें और सूर्य या तेज़ लेज़र को सीधे कभी न देखें। चिकनी सतह से नियमित परावर्तन होता है; खुरदरी सतह परावर्तित किरणों को बिखेरती है।'],
      pred:['What do you predict when two mirrors are set at a smaller angle?','दो दर्पणों का कोण घटाने पर आपका अनुमान क्या है?',['More images can form.','No reflected images can form.'],['अधिक प्रतिबिंब बन सकते हैं।','कोई परावर्तित प्रतिबिंब नहीं बनेगा।']],
      check:['What usually happens to the number of images when two mirrors are brought closer together?','दो दर्पणों को पास लाने पर आमतौर पर प्रतिबिंबों की संख्या का क्या होता है?',['More images can form.','Fewer images always form.'],['अधिक प्रतिबिंब बन सकते हैं।','हमेशा कम प्रतिबिंब बनते हैं।'],'In the ideal model, a smaller angle between mirrors gives more repeated reflections and images.','आदर्श मॉडल में दर्पणों के बीच छोटा कोण बार-बार परावर्तन और अधिक प्रतिबिंब बनाता है।'],
      hint:['The mirrors can reflect light back and forth more times at a smaller angle.','छोटे कोण पर दर्पण प्रकाश को अधिक बार आगे-पीछे परावर्तित कर सकते हैं।'],
    },
    'natural-phenomena': {
      title:['Some Natural Phenomena','कुछ प्राकृतिक घटनाएँ'],short:['Some natural phenomena','कुछ प्राकृतिक घटनाएँ'],
      intro:['Rubbing can transfer electric charge; charge interactions and lightning can be modelled safely here. Earthquakes begin when parts of Earth\'s crust move, sending waves from an underground focus.','रगड़ने से विद्युत आवेश स्थानांतरित हो सकता है; आवेशों की परस्पर क्रिया और बिजली चमकने को यहाँ सुरक्षित रूप से दिखाया गया है। पृथ्वी की पर्पटी के हिस्से खिसकने पर भूकंप शुरू होता है और भूमिगत उद्गम-केंद्र से तरंगें निकलती हैं।'],
      observation:['How do like and unlike charges interact? Where do earthquake waves begin, and where is the epicentre?','समान और विपरीत आवेश कैसे परस्पर क्रिया करते हैं? भूकंप तरंगें कहाँ से शुरू होती हैं और अधिकेंद्र कहाँ होता है?'],
      note:['Lightning and earthquake drawings are conceptual—not forecasts, warnings or safety substitutes.','बिजली और भूकंप के चित्र अवधारणा समझाते हैं—ये पूर्वानुमान, चेतावनी या सुरक्षा निर्देश नहीं हैं।'],
      learn:['Rubbing can transfer electrons between some materials, leaving opposite charges. Unlike charges attract; like charges repel. Lightning is a huge electrical discharge—during a storm go indoors, away from windows, and avoid open areas, tall isolated objects and water. During an earthquake: Drop, Cover and Hold On; if outside, move to an open area away from buildings and wires. Follow local authorities.','कुछ पदार्थों को रगड़ने से इलेक्ट्रॉन स्थानांतरित होते हैं और विपरीत आवेश रह जाते हैं। विपरीत आवेश आकर्षित और समान आवेश प्रतिकर्षित होते हैं। बिजली चमकना बहुत बड़ा विद्युत विसर्जन है—तूफ़ान में घर के भीतर जाएँ, खिड़कियों से दूर रहें और खुले स्थान, अकेले ऊँचे पेड़/वस्तु तथा पानी से बचें। भूकंप में: झुकें, ढकें और पकड़कर रहें; बाहर हों तो इमारतों और तारों से दूर खुले स्थान पर जाएँ। स्थानीय प्रशासन के निर्देश मानें।'],
      pred:['Where do you predict earthquake waves begin?','आपके अनुसार भूकंप तरंगें कहाँ से शुरू होती हैं?',['At the underground focus.','At the surface epicentre.'],['भूमिगत उद्गम-केंद्र से।','सतह के अधिकेंद्र से।']],
      check:['Where is an earthquake\'s focus?','भूकंप का उद्गम-केंद्र कहाँ होता है?',['Below the ground, where the shaking starts.','On the surface directly above the focus.'],['भूमि के नीचे, जहाँ कंपन शुरू होता है।','उद्गम-केंद्र के ठीक ऊपर सतह पर।'],'The focus is underground. The epicentre is the point on the surface above it.','उद्गम-केंद्र भूमिगत होता है। उसके ठीक ऊपर सतह का बिंदु अधिकेंद्र है।'],
      hint:['The focus is inside Earth; the epicentre is directly above it.','उद्गम-केंद्र पृथ्वी के भीतर होता है; अधिकेंद्र ठीक उसके ऊपर है।'],
    },
  }

  const quizHi = {
    6: [
      ['लंबाई की SI इकाई क्या है?',['मीटर (m)','लीटर (L)','सेकंड (s)','किलोग्राम (kg)'],'मीटर, जिसका संकेत m है, लंबाई की SI आधार इकाई है।'],
      ['सरल परिपथ में बल्ब कब जलता है?',['जब परिपथ का मार्ग बंद हो','जब एक तार अलग हो','केवल स्विच खुला होने पर','जब सेल पास हो'],'पूरे और बंद मार्ग में विद्युत धारा बह सकती है।'],
      ['समतल दर्पण के प्रतिबिंब के बारे में कौन-सा कथन सही है?',['यह आभासी और सीधा होता है','यह हमेशा उल्टा होता है','यह अपना प्रकाश बनाता है','यह हमेशा छोटा होता है'],'समतल दर्पण सीधा आभासी प्रतिबिंब बनाता है और दायाँ-बायाँ उलट देता है।'],
    ],
    7: [
      ['कौन-सा ऊष्मा स्थानांतरण खाली अंतरिक्ष में भी हो सकता है?',['विकिरण','चालन','संवहन','इनमें से कोई नहीं'],'विकिरण तरंगों से ऊर्जा पहुँचाता है और इसे भौतिक माध्यम की ज़रूरत नहीं होती।'],
      ['एक विद्यार्थी 10 s में 60 m चलता है। औसत चाल क्या है?',['6 m/s','50 m/s','0.6 m/s','600 m/s'],'चाल = दूरी ÷ समय = 60 ÷ 10 = 6 m/s।'],
      ['धारा बहुत अधिक होने पर फ्यूज़ क्या कर सकता है?',['पिघलकर परिपथ तोड़ सकता है','धारा को असीमित कर सकता है','धारा को ध्वनि में बदल सकता है','अतिरिक्त धारा जमा कर सकता है'],'धारा बहुत अधिक होने पर फ्यूज़ पिघलकर परिपथ तोड़ने के लिए बनाया जाता है।'],
    ],
    8: [
      ['2 cm² क्षेत्र पर 20 N बल लगता है। दाब कितना है?',['10 N/cm²','40 N/cm²','22 N/cm²','0.1 N/cm²'],'दाब = बल ÷ क्षेत्रफल = 20 ÷ 2 = 10 N/cm²।'],
      ['कौन-सा असंपर्क बल है?',['चुंबकीय बल','घर्षण','डिब्बे को धकेलता हाथ','बर्फगाड़ी खींचती रस्सी'],'चुंबकीय बल बिना संपर्क के लग सकता है।'],
      ['भूकंप के समय घर के भीतर क्या करना चाहिए?',['झुकें, ढकें और पकड़कर रहें','खिड़की की ओर दौड़ें','लिफ़्ट लें','दरवाज़े की खिड़की के नीचे खड़े हों'],'झुकना, ढकना और पकड़कर रहना गिरती वस्तुओं से बचाता है। स्थानीय सुरक्षा निर्देश मानें।'],
    ],
  }
  const dictionaries = { en: {}, hi: {} }
  for (const [key, value] of Object.entries(common)) { dictionaries.en[`common.${key}`] = value[0]; dictionaries.hi[`common.${key}`] = value[1] }
  for (const [id, record] of Object.entries(modules)) {
    for (const key of ['title','short','intro','observation','note','learn','hint']) {
      dictionaries.en[`module.${id}.${key}`] = record[key][0]
      dictionaries.hi[`module.${id}.${key}`] = record[key][1]
    }
    for (const [kind, offset] of [['prediction', 0], ['check', 0]]) {
      const entry = record[kind === 'prediction' ? 'pred' : kind]
      dictionaries.en[`module.${id}.${kind}.question`] = entry[0]
      dictionaries.hi[`module.${id}.${kind}.question`] = entry[1]
      dictionaries.en[`module.${id}.${kind}.option.0`] = entry[2][0]
      dictionaries.en[`module.${id}.${kind}.option.1`] = entry[2][1]
      dictionaries.hi[`module.${id}.${kind}.option.0`] = entry[3][0]
      dictionaries.hi[`module.${id}.${kind}.option.1`] = entry[3][1]
      if (kind === 'check') {
        dictionaries.en[`module.${id}.check.feedback`] = entry[4]
        dictionaries.hi[`module.${id}.check.feedback`] = entry[5]
      }
    }
  }
  const explanations = {
    'motion-distance':['The marker follows the selected path. Speed and elapsed time set how far it moves; the track length stays fixed.','निशान चुने हुए पथ पर चलता है। चाल और बीता समय तय करते हैं कि वह कितनी दूर जाएगा; पथ की लंबाई स्थिर रहती है।'],
    'light-shadow':['Light travels from a source. Materials let different amounts through, so a shadow or image forms.','प्रकाश स्रोत से चलता है। पदार्थ अलग-अलग मात्रा में प्रकाश गुजरने देते हैं, जिससे छाया या प्रतिबिंब बनता है।'],
    'electric-circuits':['The model lights the bulb only when the switch is closed and the sample completes a conducting path.','मॉडल में बल्ब तभी जलता है जब स्विच बंद हो और नमूना चालक मार्ग पूरा करे।'],
    magnets:['The test shows which sample responds to the magnet. Like poles repel; unlike poles attract.','जाँच दिखाती है कि कौन-सा नमूना चुंबक से आकर्षित होता है। समान ध्रुव प्रतिकर्षित और विपरीत ध्रुव आकर्षित होते हैं।'],
    heat:['The selected mode shows conduction, convection or radiation. The temperature control is a virtual reading.','चुना हुआ तरीका चालन, संवहन या विकिरण दिखाता है। तापमान नियंत्रण आभासी माप दिखाता है।'],
    'motion-time':['The graph slope represents average speed. The pendulum model shows that a longer length gives a longer period.','ग्राफ की ढलान औसत चाल दर्शाती है। लोलक मॉडल में लंबाई बढ़ने पर आवर्तकाल बढ़ता है।'],
    'current-effects':['Current can heat a wire and create a magnetic effect. The fuse model interrupts an excessive current.','धारा तार को गर्म कर सकती है और चुंबकीय प्रभाव पैदा करती है। फ्यूज़ मॉडल बहुत अधिक धारा को रोकता है।'],
    light:['Mirrors reflect light, lenses refract it, and a prism separates white light into colours.','दर्पण प्रकाश परावर्तित करते हैं, लेंस उसे अपवर्तित करते हैं और प्रिज़्म सफेद प्रकाश को रंगों में बाँटता है।'],
    'electric-effects':['The model shows that some liquids conduct and that a suitable solution can support a chemical effect.','मॉडल दिखाता है कि कुछ द्रव चालक होते हैं और उपयुक्त घोल रासायनिक प्रभाव में मदद कर सकता है।'],
    forces:['The arrows show force direction and relative strength. Contact and non-contact forces affect motion in different ways.','तीर बल की दिशा और सापेक्ष परिमाण दिखाते हैं। संपर्क और असंपर्क बल गति को अलग-अलग तरह से प्रभावित करते हैं।'],
    'pressure-weather':['Pressure is force divided by area. Fluid pressure grows with depth; the wind and cyclone views are conceptual.','दाब = बल ÷ क्षेत्रफल। गहराई के साथ द्रव दाब बढ़ता है; पवन और चक्रवात के दृश्य अवधारणा समझाते हैं।'],
    sound:['Frequency changes the represented pitch and amplitude changes represented loudness. Sound needs a material medium.','आवृत्ति दर्शाए गए तारत्व को और आयाम दर्शाई गई प्रबलता को बदलता है। ध्वनि को भौतिक माध्यम चाहिए।'],
    'reflection-eye':['Smooth surfaces reflect regularly and rough surfaces scatter light. The eye diagram shows how light is focused.','चिकनी सतहें नियमित परावर्तन करती हैं और खुरदरी सतहें प्रकाश बिखेरती हैं। आँख का चित्र प्रकाश केंद्रित होना दिखाता है।'],
    'natural-phenomena':['The model shows charge interaction or a conceptual storm or earthquake. It is not a forecast or safety substitute.','मॉडल आवेशों की क्रिया या तूफ़ान अथवा भूकंप की अवधारणा दिखाता है। यह पूर्वानुमान या सुरक्षा निर्देश नहीं है।'],
  }
  for (const [id, pair] of Object.entries(explanations)) { dictionaries.en[`module.${id}.explanation`] = pair[0]; dictionaries.hi[`module.${id}.explanation`] = pair[1] }
  const quizEnglish = {
    6: [
      ['What is the SI unit of length?',['Metre (m)','Litre (L)','Second (s)','Kilogram (kg)'],'The metre, symbol m, is the SI base unit for length.'],
      ['When does a bulb in a simple circuit light?',['When the circuit path is closed','When one wire is disconnected','Only when the switch is open','Whenever a cell is nearby'],'Current can flow around a complete, closed path.'],
      ['Which statement about a plane mirror image is correct?',['It is virtual and upright','It is always upside-down','It makes its own light','It is always smaller'],'A plane mirror forms an upright virtual image and reverses left and right.'],
    ],
    7: [
      ['Which heat transfer can travel through empty space?',['Radiation','Conduction','Convection','None of these'],'Radiation transfers energy by waves and does not need a material medium.'],
      ['A learner travels 60 m in 10 s. What is the average speed?',['6 m/s','50 m/s','0.6 m/s','600 m/s'],'Speed = distance ÷ time = 60 ÷ 10 = 6 m/s.'],
      ['What can a fuse do if too much current flows?',['Melt and break the circuit','Make current unlimited','Turn current into sound','Store extra current'],'A fuse is designed to melt and interrupt a circuit when current is excessive.'],
    ],
    8: [
      ['A force of 20 N acts over 2 cm². What is the pressure?',['10 N/cm²','40 N/cm²','22 N/cm²','0.1 N/cm²'],'Pressure = force ÷ area = 20 ÷ 2 = 10 N/cm².'],
      ['Which is a non-contact force?',['Magnetic force','Friction','A hand pushing a box','A rope pulling a sled'],'Magnetic force can act without the objects touching.'],
      ['What should you do during earthquake shaking indoors?',['Drop, Cover and Hold On','Run to a window','Use a lift','Stand under a doorway window'],'Drop, Cover and Hold On helps protect you from falling objects. Follow local safety guidance.'],
    ],
  }
  for (const grade of [6,7,8]) for (let i=0;i<3;i++) {
    const key=`quiz.${grade}.${i}`, en=quizEnglish[grade][i], hi=quizHi[grade][i]
    dictionaries.en[`${key}.question`]=en[0]; dictionaries.hi[`${key}.question`]=hi[0]
    dictionaries.en[`${key}.feedback`]=en[2]; dictionaries.hi[`${key}.feedback`]=hi[2]
    for(let choice=0;choice<4;choice++){dictionaries.en[`${key}.option.${choice}`]=en[1][choice];dictionaries.hi[`${key}.option.${choice}`]=hi[1][choice]}
  }
  const optionTranslations = {
    'Type of motion':['गति का प्रकार'],'Straight line':['सीधी रेखा'],'Circular path':['वृत्ताकार पथ'],'Back and forth':['आगे-पीछे'],Speed:['चाल'],'Track length':['पथ की लंबाई'],
    'Light activity':['प्रकाश गतिविधि'],Shadow:['छाया'],'Pinhole camera':['पिनहोल कैमरा'],'Plane mirror':['समतल दर्पण'],Material:['पदार्थ'],'Transparent':['पारदर्शी'],'Translucent':['पारभासी'],'Opaque':['अपारदर्शी'],'Object position':['वस्तु की स्थिति'],
    Switch:['स्विच'],'Test material':['जाँच का पदार्थ'],Copper:['ताँबा'],Iron:['लोहा'],Aluminium:['एल्युमिनियम'],Rubber:['रबर'],Plastic:['प्लास्टिक'],Wood:['लकड़ी'],
    'Facing poles':['आमने-सामने के ध्रुव'],'North + South':['उत्तर + दक्षिण'],'North + North':['उत्तर + उत्तर'],'South + South':['दक्षिण + दक्षिण'],'Care tip':['देखभाल का सुझाव'],'Store with keepers':['रक्षकों के साथ रखें'],'Keep dry':['सूखा रखें'],'Avoid repeated dropping':['बार-बार गिरने से बचाएँ'],
    'Heat transfer':['ऊष्मा का स्थानांतरण'],Conduction:['चालन'],Convection:['संवहन'],Radiation:['विकिरण'],'Warm sample':['गर्म नमूना'],'Surface colour':['सतह का रंग'],Dark:['गहरा'],Light:['हल्का'],
    Distance:['दूरी'],'Time taken':['लगा समय'],'Pendulum length':['लोलक की लंबाई'],'Demonstration':['प्रदर्शन'],'Heating effect':['ऊष्मीय प्रभाव'],Electromagnet:['विद्युत चुंबक'],'Electric bell':['बिजली की घंटी'],'Circuit symbols':['परिपथ के चिह्न'],'Current setting':['धारा का मान'],'Coil turns':['कुंडली के फेरे'],
    'Optical element':['प्रकाशीय उपकरण'],'Concave mirror':['अवतल दर्पण'],'Convex mirror':['उत्तल दर्पण'],'Convex lens':['उत्तल लेंस'],'Concave lens':['अवतल लेंस'],Element:['उपकरण'],'Object distance':['वस्तु की दूरी'],'Object height':['वस्तु की ऊँचाई'],
    Effect:['प्रभाव'],Heating:['ऊष्मीय'],Magnetic:['चुंबकीय'], 'Liquid conduction':['द्रव में चालन'],Electroplating:['विद्युत-लेपन'],'Sample liquid':['नमूना द्रव'],'Salt solution':['नमक का घोल'],'Lemon solution':['नींबू का घोल'],'Distilled water':['आसुत जल'],'Vegetable oil':['वनस्पति तेल'],'Virtual switch':['आभासी स्विच'],
    'Force example':['बल का उदाहरण'],'Muscular push':['पेशीय धक्का'],Friction:['घर्षण'],Electrostatic:['स्थिर-वैद्युत'],Gravitational:['गुरुत्वाकर्षण'],'Force strength':['बल का परिमाण'],Surface:['सतह'],Rough:['खुरदरी'],Smooth:['चिकनी'],
    Model:['मॉडल'],'Surface pressure':['सतही दाब'],'Fluid pressure':['द्रव दाब'],'Wind currents':['वायु धाराएँ'],Cyclone:['चक्रवात'],Force:['बल'],Area:['क्षेत्रफल'],'Fluid depth':['द्रव की गहराई'],
    Medium:['माध्यम'],'Air (gas)':['हवा (गैस)'],'Water (liquid)':['पानी (द्रव)'],'No medium':['कोई माध्यम नहीं'],Frequency:['आवृत्ति'],Amplitude:['आयाम'],Compare:['तुलना करें'],Music:['संगीत'],Noise:['शोर'],
    'Reflecting surface':['परावर्तक सतह'],'Smooth mirror':['चिकना दर्पण'],'Rough surface':['खुरदरी सतह'],'Angle between mirrors':['दर्पणों के बीच कोण'],'Incoming rays':['आने वाली किरणें'],
    Explore:['खोजें'],'Charging by rubbing':['रगड़कर आवेशन'],'Charge interaction':['आवेशों की परस्पर क्रिया'],Lightning:['बिजली चमकना'],'Earthquake waves':['भूकंप तरंगें'],'Charge amount':['आवेश की मात्रा'],'Charge pair':['आवेशों का जोड़ा'],    'Unlike (+ / −)':['विपरीत (+ / −)'],'Like (+ / +)':['समान (+ / +)'],
    Conductor:['चालक'],Insulator:['कुचालक'],Closed:['बंद'],Open:['खुला'],Magnetic:['चुंबकीय'],'Not magnetic':['अचुंबकीय'],Attract:['आकर्षित'],Repel:['प्रतिकर्षित'],On:['चालू'],Off:['बंद'],High:['ऊँचा'],Low:['नीचा'],'Mid-range':['मध्यम'],Louder:['अधिक तेज़'],Softer:['धीमा'],'Audible range':['श्रव्य सीमा'],Infrasound:['अवश्रव्य'],Ultrasound:['पराश्रव्य'],
  }
  const canvasTranslations = {
    'object position': 'वस्तु की स्थिति',
    'Force strength': 'बल का परिमाण',
    'Magnet care': 'चुंबक की देखभाल',
    'Wind model': 'पवन मॉडल',
    'Depth setting': 'गहराई का मान',
    'Surface pressure': 'सतही दाब',
    'Image (typical)': 'प्रतिबिंब (सामान्य)',
    'Selected effect': 'चुना हुआ प्रभाव',
    'Pitch': 'तारत्व',
    'Loudness': 'तीव्रता',
    'Hearing range': 'श्रवण सीमा',
    'Reflection': 'परावर्तन',
    'Earthquake origin': 'भूकंप का उद्गम',
    'Charges': 'आवेश',
    'Low-pressure centre': 'निम्न-दाब केंद्र',
    'Conceptual': 'अवधारणात्मक',
    'Scattered': 'बिखरा हुआ',
    'Regular': 'नियमित',
    'Luminous': 'प्रदीप्त',
    'Can be real': 'वास्तविक हो सकता है',
    'Virtual': 'आभासी',
    'Contact': 'संपर्क',
    'Non-contact': 'असंपर्क',
    'Closed': 'बंद',
    'Incomplete': 'अपूर्ण',
    'On': 'चालू',
    'Off': 'बंद',
    'Magnetic': 'चुंबकीय',
    'Not magnetic': 'अचुंबकीय',
    'Attract': 'आकर्षित',
    'Repel': 'प्रतिकर्षित',
    'Conductor': 'चालक',
    'Insulator': 'कुचालक',
    'Depositing': 'परत जम रही है',
    'Not depositing': 'परत नहीं जम रही',
    'Conducting model': 'चालक मॉडल',
    'Poor conductor model': 'दुर्बल चालक मॉडל',
    'Distance along track (m)':'पथ पर दूरी (m)','Metre (m) · centimetre (cm) · millimetre (mm)':'मीटर (m) · सेंटीमीटर (cm) · मिलीमीटर (mm)',
    rectilinear:'सरल रेखीय गति',circular:'वृत्ताकार गति','periodic · back and forth':'आवर्ती · आगे-पीछे','Tools: ruler  ·  measuring tape  ·  metre scale':'उपकरण: पैमाना · मापने का फीता · मीटर पैमाना',
    'plane mirror':'समतल दर्पण',object:'वस्तु','virtual image':'आभासी प्रतिबिंब','left ↔ right reversed':'दायाँ ↔ बायाँ उलटा','tiny pinhole':'छोटा पिनहोल','upright object':'सीधी वस्तु','inverted image':'उल्टा प्रतिबिंब','Light travels in straight lines':'प्रकाश सीधी रेखा में चलता है','luminous source':'प्रदीप्त स्रोत',screen:'पर्दा','Light passes through':'प्रकाश गुजरता है','shadow':'छाया','no dark shadow':'गहरी छाया नहीं',
    cell:'सेल',switch:'स्विच',bulb:'बल्ब',coating:'परत','virtual conducting-liquid circuit':'आभासी चालक-द्रव परिपथ','cell · wires · switch · test material · bulb':'सेल · तार · स्विच · जाँच पदार्थ · बल्ब',sample:'नमूना',
    'Made magnet · bar magnet':'निर्मित चुंबक · छड़ चुंबक','attracted to magnet':'चुंबक से आकर्षित','not attracted in this model':'इस मॉडल में आकर्षित नहीं','natural lodestone':'प्राकृतिक चुम्बक-पत्थर',compass:'दिशा-सूचक','unlike poles attract':'विपरीत ध्रुव आकर्षित होते हैं','like poles repel':'समान ध्रुव प्रतिकर्षित होते हैं',
    'energy passes through a solid':'ऊर्जा ठोस से होकर जाती है','warm fluid rises · cool fluid sinks':'गर्म द्रव ऊपर उठता है · ठंडा द्रव नीचे आता है','absorbs more':'अधिक सोखता है','absorbs less':'कम सोखता है','Clinical thermometer → body temperature   ·   Laboratory thermometer → experiments':'चिकित्सीय थर्मामीटर → शरीर का तापमान · प्रयोगशाला थर्मामीटर → प्रयोग',
    'Distance–time graph':'दूरी-समय ग्राफ','distance':'दूरी','time':'समय','pendulum':'लोलक','one oscillation':'एक दोलन','Current':'धारा','Fuse':'फ्यूज़','Electromagnet':'विद्युत चुंबक','Electric bell':'बिजली की घंटी','Heating effect':'ऊष्मीय प्रभाव','Circuit symbols':'परिपथ के चिह्न',
    'Plane mirror':'समतल दर्पण','Concave mirror':'अवतल दर्पण','Convex mirror':'उत्तल दर्पण','Convex lens':'उत्तल लेंस','Concave lens':'अवतल लेंस','Prism':'प्रिज़्म','real image':'वास्तविक प्रतिबिंब','virtual image':'आभासी प्रतिबिंब',
    'Muscular push':'पेशीय धक्का','push · contact':'धक्का · संपर्क','rough · more friction':'खुरदरी · अधिक घर्षण','smooth · less friction':'चिकनी · कम घर्षण',magnet:'चुंबक','charged object':'आवेशित वस्तु',Earth:'पृथ्वी','acts across a gap · non-contact':'दूरी से लगता है · असंपर्क','A force can change motion or shape':'बल गति या आकार बदल सकता है',
    'LOW PRESSURE':'कम दाब','Cyclone model · not a forecast':'चक्रवात मॉडल · पूर्वानुमान नहीं','fluid pressure increases with depth':'गहराई के साथ द्रव दाब बढ़ता है','uneven heating → moving air → wind':'असमान गर्मी → चलती हवा → पवन','Air around us also exerts atmospheric pressure':'हमारे चारों ओर की हवा वायुमंडलीय दाब डालती है',
    'No medium · sound cannot travel':'कोई माध्यम नहीं · ध्वनि नहीं चल सकती','voice box':'स्वरयंत्र',ear:'कान','Infrasound · below usual hearing range':'अवश्रव्य · सामान्य श्रवण सीमा से नीचे','Ultrasound · above usual hearing range':'पराश्रव्य · सामान्य श्रवण सीमा से ऊपर','Within usual human hearing range':'मानव की सामान्य श्रवण सीमा में',
    'smooth mirror · regular reflection':'चिकना दर्पण · नियमित परावर्तन','rough surface · scattered rays':'खुरदरी सतह · बिखरी किरणें',cornea:'स्वच्छमंडल',iris:'परितारिका',pupil:'पुतली',lens:'लेंस',retina:'दृष्टिपटल','optic nerve':'दृष्टि तंत्रिका','Light focuses on retina':'प्रकाश दृष्टिपटल पर केंद्रित होता है',
    'focus · underground':'उद्गम-केंद्र · भूमिगत',epicentre:'अधिकेंद्र','seismic waves travel out from the focus':'भूकंपीय तरंगें उद्गम-केंद्र से बाहर जाती हैं','charged storm cloud':'आवेशित तूफ़ानी बादल','Lightning safety: go indoors · avoid water & open areas':'बिजली से सुरक्षा: घर के भीतर जाएँ · पानी और खुले स्थान से बचें',rub:'रगड़ें','charge transfer by rubbing':'रगड़कर आवेश स्थानांतरण',
    'Tools: ruler · measuring tape · metre scale': 'उपकरण: पैमाना · मापने का फीता · मीटर पैमाना',
    'Opaque object': 'अपारदर्शी वस्तु',
    'Translucent object': 'पारभासी वस्तु',
    'Transparent object': 'पारदर्शी वस्तु',
    'Cool reference: 20 °C · Warm sample:': 'ठंडा संदर्भ: 20 °C · गर्म नमूना:',
    'slope = speed =': 'ढलान = चाल =',
    'electromagnet pulls arm': 'विद्युत चुंबक भुजा को खींचता है',
    'current in a coil makes a magnet': 'कुंडली में धारा चुंबक बनाती है',
    'coil turns': 'कुंडली के फेरे',
    'A setting': 'A मान',
    'image (virtual)': 'प्रतिबिंब (आभासी)',
    'image (real)': 'प्रतिबिंब (वास्तविक)',
    'same size · lateral inversion': 'समान आकार · पार्श्व परिवर्तन',
    'current creates a magnetic field': 'धारा चुंबकीय क्षेत्र बनाती है',
    'current → heating effect': 'धारा → ऊष्मीय प्रभाव',
    'open switch · no current': 'खुला स्विच · कोई धारा नहीं',
    'metal layer grows on the object': 'वस्तु पर धातु की परत जमती है',
    'charged particles carry current': 'आवेशित कण धारा ले जाते हैं',
    'push · contact': 'धक्का · संपर्क',
    'acts across a gap · non-contact': 'दूरी से लगता है · असंपर्क',
    'Force strength:': 'बल का परिमाण:',
    '(illustrative)': '(चित्रात्मक)',
    'A force can change motion or shape': 'बल गति या आकार बदल सकता है',
    'Force =': 'बल =',
    'Area =': 'क्षेत्रफल =',
    'Pressure =': 'दाब =',
    'Air around us also exerts atmospheric pressure': 'हमारे चारों ओर की हवा वायुमंडलीय दाब डालती है',
    'depth': 'गहराई',
    'distance (m)': 'दूरी (m)',
    'time (s)': 'समय (s)',
    'Common circuit symbols': 'सामान्य परिपथ चिह्न',
    'bell': 'घंटी',
    'white light': 'श्वेत प्रकाश',
    'spectrum · seven colours': 'वर्णक्रम · सात रंग',
    'fluid pressure increases with depth': 'गहराई के साथ द्रव दाब बढ़ता है',
    'uneven heating → moving air → wind': 'असमान तापन → चलती हवा → पवन',
    'amplitude': 'आयाम',
    'Vibrations through air (gas)': 'हवा (गैस) में कंपन',
    'Vibrations through water (liquid)': 'पानी (द्रव) में कंपन',
    'Vibrations through solid': 'ठोस में कंपन',
    'Two mirrors ·': 'दो दर्पण ·',
    'about': 'लगभग',
    'images': 'प्रतिबिंब',
    'charges attract': 'आवेश आकर्षित होते हैं',
    'charges repel': 'आवेश प्रतिकर्षित होते हैं',
    'attract': 'आकर्षित होते हैं',
    'repel': 'प्रतिकर्षित होते हैं',
    'greater current · greater heating effect (conceptual)': 'अधिक धारा · अधिक ऊष्मीय प्रभाव (अवधारणा)',
    'fuse · melts if current is too high': 'फ्यूज़ · अत्यधिक धारा बहने पर पिघल जाता है',
    'virtual · upright · behind mirror': 'आभासी · सीधा · दर्पण के पीछे',
    'real · inverted': 'वास्तविक · उल्टा',
    'virtual · upright': 'आभासी · सीधा',
    'Dark surface · absorbs more radiation': 'गहरी सतह · अधिक विकिरण सोखती है',
    'Light surface · absorbs less radiation': 'हल्की सतह · कम विकिरण सोखती है',
    'surface': 'सतह',
    'radiation': 'विकिरण',
    'hand push': 'हाथ का धक्का',
    'friction opposes sliding': 'घर्षण फिसलने का विरोध करता है',
    'magnetic pull / push': 'चुंबकीय खिंचाव / धक्का',
    'electrostatic attraction / repulsion': 'स्थिर-वैद्युत आकर्षण / प्रतिकर्षण',
    'gravitational pull towards Earth': 'पृथ्वी की ओर गुरुत्वीय खिंचाव',
  }
  for (const [key, value] of Object.entries(canvasTranslations)) { dictionaries.en[`canvas.${key}`]=key; dictionaries.hi[`canvas.${key}`]=value }
  Object.assign(optionTranslations, {
    'Iron nail':['\u0932\u094b\u0939\u0947 \u0915\u0940 \u0915\u0940\u0932'],
    'Steel paper clip':['\u0938\u094d\u091f\u0940\u0932 \u0915\u0940 \u092a\u0947\u092a\u0930 \u0915\u094d\u0932\u093f\u092a'],
    'Copper coin':['\u0924\u093e\u0901\u092c\u0947 \u0915\u093e \u0938\u093f\u0915\u094d\u0915\u093e'],
    Prism:['\u092a\u094d\u0930\u093f\u091c\u093c\u094d\u092e'],
    Solid:['\u0920\u094b\u0938'],
  })
  for (const [key, pair] of Object.entries(optionTranslations)) {
    dictionaries.en[`value.${key}`] = key
    dictionaries.hi[`value.${key}`] = pair[0]
  }

  const helperPhrases = {
    'phrase.pathStraight': ['straight line', 'सीधी रेखा'],
    'phrase.pathCircular': ['circular', 'वृत्ताकार'],
    'phrase.pathPeriodic': ['repeating back-and-forth', 'आवर्ती आगे-पीछे'],
    'phrase.shadowDark': ['dark shadow', 'गहरी छाया'],
    'phrase.shadowDimmer': ['softer, dimmer shadow', 'हल्की, धुंधली छाया'],
    'phrase.shadowLittle': ['little or no dark shadow', 'गहरी छाया बहुत कम या नहीं'],
    'phrase.circuitComplete': ['complete path', 'पूर्ण परिपथ'],
    'phrase.circuitIncomplete': ['incomplete path', 'अपूर्ण परिपथ'],
    'phrase.attracting': ['attracting', 'आकर्षित होते हुए'],
    'phrase.repelling': ['repelling', 'प्रतिकर्षित होते हुए'],
    'phrase.sampleAttracted': ['is attracted', 'आकर्षित होता है'],
    'phrase.sampleNotAttracted': ['is not attracted in this model', 'इस मॉडल में आकर्षित नहीं होता'],
    'phrase.depositing': ['depositing', 'परत जम रही है'],
    'phrase.notDepositing': ['not depositing', 'परत नहीं जम रही है'],
    'phrase.contact': ['contact', 'संपर्क'],
    'phrase.nonContact': ['non-contact', 'असंपर्क'],
    'phrase.infrasound': ['infrasound', 'अवश्रव्य सीमा'],
    'phrase.ultrasound': ['ultrasound', 'पराश्रव्य सीमा'],
    'phrase.audible': ['audible range', 'श्रव्य सीमा'],
    'phrase.noMedium': ['no sound travels without a medium', 'बिना माध्यम के ध्वनि नहीं चल सकती'],
    'phrase.on': ['ON', 'चालू'],
    'phrase.off': ['OFF', 'बंद'],
    'phrase.closed': ['Closed', 'बंद'],
    'phrase.open': ['Open', 'खुला'],
    'phrase.conducting': ['conducting', 'चालक'],
    'phrase.poorConductor': ['poor conductor', 'दुर्बल चालक'],
    'phrase.conductor': ['conductor', 'चालक'],
    'phrase.insulator': ['insulator', 'कुचालक'],
    'phrase.attract': ['attract', 'आकर्षित होते हैं'],
    'phrase.repel': ['repel', 'प्रतिकर्षित होते हैं'],
  };
  for (const [key, pair] of Object.entries(helperPhrases)) {
    dictionaries.en[key] = pair[0];
    dictionaries.hi[key] = pair[1];
  }

  const metricTranslations = {
    'Distance travelled': ['Distance travelled', 'तय की गई दूरी'],
    'Speed setting': ['Speed setting', 'चाल का मान'],
    'Path': ['Path', 'पथ'],
    'Demo': ['Demo', 'प्रदर्शन'],
    'Material': ['Material', 'पदार्थ'],
    'Light source': ['Light source', 'प्रकाश स्रोत'],
    'Circuit': ['Circuit', 'परिपथ'],
    'Bulb': ['Bulb', 'बल्ब'],
    'Poles': ['Poles', 'ध्रुव'],
    'Magnet care': ['Magnet care', 'चुंबक की देखभाल'],
    'Cool reference': ['Cool reference', 'ठंडा संदर्भ'],
    'Warm sample': ['Warm sample', 'गर्म नमूना'],
    'Transfer': ['Transfer', 'स्थानांतरण'],
    'Speed': ['Speed', 'चाल'],
    'Pendulum period': ['Pendulum period', 'लोलक का आवर्तकाल'],
    'Graph slope': ['Graph slope', 'ग्राफ की ढलान'],
    'Coil turns': ['Coil turns', 'कुंडली के फेरे'],
    'Current setting': ['Current setting', 'धारा का मान'],
    'Element': ['Element', 'उपकरण'],
    'Focal length': ['Focal length', 'फोकस दूरी'],
    'Liquid': ['Liquid', 'द्रव'],
    'Force example': ['Force example', 'बल का उदाहरण'],
    'Force': ['Force', 'बल'],
    'Pressure': ['Pressure', 'दाब'],
    'Frequency': ['Frequency', 'आवृत्ति'],
    'Medium': ['Medium', 'माध्यम'],
    'Surface': ['Surface', 'सतह'],
    'Mirror angle': ['Mirror angle', 'दर्पणों का कोण'],
    'Images formed': ['Images formed', 'बने प्रतिबिंब'],
    'Charge relation': ['Charge relation', 'आवेश संबंध'],
  };
  for (const [key, pair] of Object.entries(metricTranslations)) {
    dictionaries.en[`metric.${key}`] = pair[0];
    dictionaries.hi[`metric.${key}`] = pair[1];
  }

  const formulas = {
  // motion-distance
  'formula.motion-distance.rule': [
    'Time per model pass = track length ÷ speed\nphase = (elapsed time × speed ÷ track length) mod 1\nposition along path = phase × track length',
    'मॉडल में एक चक्कर का समय = पथ की लंबाई ÷ चाल\nफेज़ = (बीता समय × चाल ÷ पथ की लंबाई) mod 1\nपथ पर स्थिति = फेज़ × पथ की लंबाई'
  ],
  'formula.motion-distance.sub': [
    'T = {distance} m ÷ {speed} m/s = {lap} s\nphase = ({t} s × {speed} m/s ÷ {distance} m) mod 1 = {phase}\nposition = {phase} × {distance} m = {position} m',
    'T = {distance} m ÷ {speed} m/s = {lap} s\nफेज़ = ({t} s × {speed} m/s ÷ {distance} m) mod 1 = {phase}\nस्थिति = {phase} × {distance} m = {position} m'
  ],
  'formula.motion-distance.res': [
    'One pass: {lap} s · Current position along the {path} path: {position} m',
    'एक चक्कर: {lap} s · {path} पथ पर वर्तमान स्थिति: {position} m'
  ],
  'formula.motion-distance.meaning': [
    "The orange marker repeats around the selected path. The marker's progress is set by the speed and the elapsed animation time.",
    'नारंगी निशान चुने हुए पथ पर बार-बार चलता है। निशान की प्रगति चाल और बीते हुए एनिमेशन समय से तय होती है।'
  ],
  'formula.motion-distance.example': [
    'Walking {distance} m at {speed} m/s would take about {lap} s at a steady pace.',
    'एकसमान चाल से {speed} m/s पर {distance} m चलने में लगभग {lap} s का समय लगेगा।'
  ],
  'formula.motion-distance.note': [
    'The marker loops for learning; this is not a measured journey. The drawing is not to scale.',
    'सीखने के लिए निशान बार-बार दोहराता है; यह वास्तविक यात्रा नहीं है। चित्र माप के अनुसार नहीं है।'
  ],

  // light-shadow mirror
  'formula.light-shadow.mirror.rule': [
    'Plane mirror: image distance = object distance\nImage is virtual, upright and left-right reversed.',
    'समतल दर्पण: प्रतिबिंब की दूरी = वस्तु की दूरी\nप्रतिबिंब आभासी, सीधा और पार्श्व-परिवर्तित (बायाँ-दायाँ उलट) होता है।'
  ],
  'formula.light-shadow.mirror.sub': [
    'The diagram places the virtual image the same distance behind the mirror as the object is in front.',
    'चित्र में आभासी प्रतिबिंब दर्पण के पीछे उतनी ही दूरी पर है जितनी दूरी पर वस्तु सामने है।'
  ],
  'formula.light-shadow.mirror.res': [
    'Equal distances in the drawing; no physical length is measured.',
    'चित्र में बराबर दूरियाँ; कोई भौतिक लंबाई नहीं मापी गई है।'
  ],
  'formula.light-shadow.mirror.meaning': [
    'A mirror image appears behind the mirror, even though light does not travel from that point.',
    'दर्पण का प्रतिबिंब दर्पण के पीछे दिखाई देता है, भले ही प्रकाश उस बिंदु से नहीं आता।'
  ],
  'formula.light-shadow.mirror.example': [
    'Your reflection appears as far behind a bathroom mirror as you stand in front of it.',
    'दर्पण के सामने आप जितनी दूरी पर खड़े होते हैं, आपका प्रतिबिंब भी दर्पण के पीछे उतनी ही दूरी पर दिखता है।'
  ],
  'formula.light-shadow.mirror.note': [
    'This mode draws a fixed mirror example. Material and position controls affect the shadow mode, not this diagram.',
    'यह दृश्य एक निश्चित दर्पण उदाहरण दिखाता है। पदार्थ और स्थिति नियंत्रण केवल छाया दृश्य को बदलते हैं।'
  ],

  // light-shadow pinhole
  'formula.light-shadow.pinhole.rule': [
    'Light travels in straight lines:\ntop of object → pinhole → bottom of image',
    'प्रकाश सीधी रेखा में चलता है:\nवस्तु का शीर्ष → पिनहोल → प्रतिबिंब का तल'
  ],
  'formula.light-shadow.pinhole.sub': [
    'Rays from opposite ends cross at the pinhole.',
    'विपरीत सिरों से आने वाली किरणें पिनहोल पर एक-दूसरे को पार करती हैं।'
  ],
  'formula.light-shadow.pinhole.res': [
    'The screen image is upside down; no size or distance is calculated.',
    'पर्दे पर प्रतिबिंब उल्टा बनता है; कोई आकार या दूरी परिकलित नहीं है।'
  ],
  'formula.light-shadow.pinhole.meaning': [
    'Only a small bundle of rays passes through the tiny opening and forms an inverted image.',
    'छोटे छिद्र से केवल किरणों का एक छोटा पुंज गुजरता है और उल्टा प्रतिबिंब बनाता है।'
  ],
  'formula.light-shadow.pinhole.example': [
    'A pinhole camera can show an upside-down view of a bright outdoor scene.',
    'पिनहोल कैमरा बाहर के चमकीले दृश्य का उल्टा चित्र दिखा सकता है।'
  ],
  'formula.light-shadow.pinhole.note': [
    'This is a ray sketch, not a full camera model. Material and position controls apply to the shadow mode.',
    'यह एक किरण चित्र है, पूर्ण कैमरा मॉडल नहीं। पदार्थ और स्थिति नियंत्रण छाया दृश्य पर लागू होते हैं।'
  ],

  // light-shadow shadow
  'formula.light-shadow.shadow.rule': [
    'Light blocked by an opaque object → shadow\nTranslucent material scatters some light; transparent material passes most light.',
    'अपारदर्शी वस्तु द्वारा प्रकाश रुकने पर → छाया बनती है\nपारभासी पदार्थ कुछ प्रकाश बिखेरता है; पारदर्शी पदार्थ से अधिकांश प्रकाश गुजर जाता है।'
  ],
  'formula.light-shadow.shadow.sub': [
    'Material = {material}; object position = {position} steps.',
    'पदार्थ = {material}; वस्तु की स्थिति = {position} कदम।'
  ],
  'formula.light-shadow.shadow.res': [
    'The model shows a {shadow}.',
    'मॉडल {shadow} दिखाता है।'
  ],
  'formula.light-shadow.shadow.meaning': [
    'Moving the object changes where its shadow falls. Material controls how much light is blocked in this drawing.',
    'वस्तु को खिसकाने से उसकी छाया का स्थान बदलता है। पदार्थ नियंत्रित करता है कि चित्र में कितना प्रकाश रुकेगा।'
  ],
  'formula.light-shadow.shadow.example': [
    'A hand between a lamp and a wall blocks light and makes a shadow.',
    'दीपक और दीवार के बीच हाथ रखने पर प्रकाश रुकता है और छाया बनती है।'
  ],
  'formula.light-shadow.shadow.note': [
    'Shadow size and brightness are illustrative, not calculated from real object dimensions or light intensity.',
    'छाया का आकार और चमक केवल समझाने के लिए है, वास्तविक वस्तु माप या प्रकाश तीव्रता से परिकलित नहीं है।'
  ],

  // electric-circuits
  'formula.electric-circuits.rule': [
    'Bulb ON = switch closed AND sample conducts\n(conceptual circuit rule)',
    'बल्ब चालू = स्विच बंद तथा नमूना चालक\n(अवधारणात्मक परिपथ नियम)'
  ],
  'formula.electric-circuits.sub': [
    '{switch} switch AND {material} ({conducts})',
    '{switch} स्विच तथा {material} ({conducts})'
  ],
  'formula.electric-circuits.res': [
    'Bulb {bulb} · {path} (no current value is calculated)',
    'बल्ब {bulb} · {path} (धारा का कोई मान परिकलित नहीं है)'
  ],
  'formula.electric-circuits.meaning': [
    'A bulb lights in this model only when the path is closed and the sample conducts.',
    'इस मॉडल में बल्ब तभी जलता है जब मार्ग बंद (पूर्ण) हो और नमूना पदार्थ चालक हो।'
  ],
  'formula.electric-circuits.example': [
    'A torch needs its switch on and a complete path through its metal contacts.',
    'टॉर्च को जलाने के लिए उसका स्विच ऑन होना और धातु संपर्कों से पूरा मार्ग होना आवश्यक है।'
  ],
  'formula.electric-circuits.note': [
    'The diagram does not set voltage, resistance or current, so it does not calculate electrical units.',
    'यह चित्र वोल्टेज, प्रतिरोध या धारा तय नहीं करता, इसलिए यह विद्युत इकाइयों की गणना नहीं करता।'
  ],

  // magnets
  'formula.magnets.rule': [
    'Unlike poles attract · like poles repel\nIron and steel are magnetic in this model.',
    'विपरीत ध्रुव आकर्षित होते हैं · समान ध्रुव प्रतिकर्षित होते हैं\nइस मॉडल में लोहा और स्टील चुंबकीय हैं।'
  ],
  'formula.magnets.sub': [
    'Facing poles = {poles}; test material = {material}.',
    'आमने-सामने के ध्रुव = {poles}; जाँच पदार्थ = {material}.'
  ],
  'formula.magnets.res': [
    'Poles {polesAction} · sample {sampleAction}.',
    'ध्रुव {polesAction} · नमूना {sampleAction}।'
  ],
  'formula.magnets.meaning': [
    'Pole names predict whether magnets pull together or push apart; the sample test shows whether this material responds to the magnet.',
    'ध्रुवों के नाम बताते हैं कि चुंबक खींचेंगे या धकेलेंगे; नमूना परीक्षण दिखाता है कि क्या यह पदार्थ चुंबक से आकर्षित होता है।'
  ],
  'formula.magnets.example': [
    'A fridge magnet attracts many steel paper clips but not a wooden pencil.',
    'फ्रिज का चुंबक स्टील की पेपर क्लिप को आकर्षित करता है लेकिन लकड़ी की पेंसिल को नहीं।'
  ],
  'formula.magnets.note': [
    'No force strength or distance is calculated. Real magnetic fields are three-dimensional.',
    'यहाँ बल का परिमाण या दूरी परिकलित नहीं है। वास्तविक चुंबकीय क्षेत्र त्रिविमीय होते हैं।'
  ],

  // heat
  'formula.heat.rule': [
    'Temperature difference: ΔT = T warm sample − T cool reference',
    'तापांतर: ΔT = T गर्म नमूना − T ठंडा संदर्भ'
  ],
  'formula.heat.sub': [
    'ΔT = {temperature} °C − 20 °C = {delta} °C\nTransfer mode = {transfer}; surface = {surface}.',
    'ΔT = {temperature} °C − 20 °C = {delta} °C\nस्थानांतरण विधि = {transfer}; सतह = {surface}।'
  ],
  'formula.heat.res': [
    'The warm sample is {delta} °C above the cool reference.',
    'गर्म नमूना ठंडे संदर्भ से {delta} °C अधिक है।'
  ],
  'formula.heat.meaning': [
    'The temperature setting changes the displayed sample reading. The selected mode changes the heat-transfer picture, not this temperature difference.',
    'तापमान नियंत्रण नमूने का पाठ्यांक बदलता है। चुनी गई विधि ऊष्मा स्थानांतरण का चित्र बदलती है, यह तापांतर नहीं।'
  ],
  'formula.heat.example': [
    'If a drink is {temperature} °C and the room is 20 °C, the difference is {delta} °C.',
    'यदि कोई पेय {temperature} °C पर है और कमरा 20 °C पर, तो तापांतर {delta} °C होगा।'
  ],
  'formula.heat.note': [
    'Temperature difference is not heat energy. The model has no mass or material heat capacity, so it does not calculate transferred heat.',
    'तापांतर ऊष्मा ऊर्जा नहीं है। इस मॉडल में द्रव्यमान या ऊष्मा धारिता नहीं है, अतः स्थानांतरित ऊष्मा की गणना नहीं होती।'
  ],

  // motion-time
  'formula.motion-time.rule': [
    'Average speed = distance ÷ time\nSmall-angle pendulum: T ≈ 2π√(L/g); f ≈ 1/T',
    'औसत चाल = दूरी ÷ समय\nलघु-कोण लोलक: T ≈ 2π√(L/g); f ≈ 1/T'
  ],
  'formula.motion-time.sub': [
    'speed = {distance} m ÷ {time} s = {speed} m/s\nT ≈ 2π√({length} m ÷ 9.8 m/s²) = {period} s\nf ≈ 1 ÷ {period} s = {frequency} Hz\nElapsed = {elapsed} s; completed swings ≈ floor(elapsed ÷ T) = {swings}.',
    'चाल = {distance} m ÷ {time} s = {speed} m/s\nT ≈ 2π√({length} m ÷ 9.8 m/s²) = {period} s\nf ≈ 1 ÷ {period} s = {frequency} Hz\nबीता समय = {elapsed} s; पूरे दोलन ≈ floor(बीता समय ÷ T) = {swings}।'
  ],
  'formula.motion-time.res': [
    'Speed {speed} m/s · period {period} s · frequency {frequency} Hz · {swings} full swing · graph {pct}%',
    'चाल {speed} m/s · आवर्तकाल {period} s · आवृत्ति {frequency} Hz · {swings} पूर्ण दोलन · ग्राफ {pct}%'
  ],
  'formula.motion-time.meaning': [
    "A longer pendulum takes more time per swing. The graph's slope is the speed, and its moving dot follows the elapsed animation time.",
    'अधिक लंबे लोलक को प्रति दोलन अधिक समय लगता है। ग्राफ की ढलान चाल दर्शाती है और चलता हुआ बिंदु बीते समय का अनुसरण करता है।'
  ],
  'formula.motion-time.example': [
    'A {length} m pendulum takes about {period} s per full swing in this small-swing model.',
    'इस लघु-दोलन मॉडल में {length} m लंबे लोलक को एक पूरे दोलन में लगभग {period} s लगते हैं।'
  ],
  'formula.motion-time.note': [
    'The period is approximate for small angles and uses fixed g = 9.8 m/s². The graph assumes steady speed.',
    'आवर्तकाल लघु कोणों के लिए सन्निकट है और निश्चित g = 9.8 m/s² का उपयोग करता है। ग्राफ एकसमान चाल मानता है।'
  ],

  // current-effects heating
  'formula.current-effects.heating.rule': [
    'Glow drawing scale = round[(I ÷ 8 A) × pulse × 110]\nFirst dot radius = 5 px + 0.18 px/A × I',
    'चमक का पैमाना = round[(I ÷ 8 A) × pulse × 110]\nपहले बिंदु की त्रिज्या = 5 px + 0.18 px/A × I'
  ],
  'formula.current-effects.heating.sub': [
    'I = {current} A; pulse = {pulse}\ncolor index = round[({current} ÷ 8) × {pulse} × 110] = {index}\nradius = 5 + 0.18 × {current} = {radius} px',
    'I = {current} A; स्पंद = {pulse}\nरंग सूचकांक = round[({current} ÷ 8) × {pulse} × 110] = {index}\nत्रिज्या = 5 + 0.18 × {current} = {radius} px'
  ],
  'formula.current-effects.heating.res': [
    'First glow dot: color index {index}; radius {radius} px.',
    'पहला चमक बिंदु: रंग सूचकांक {index}; त्रिज्या {radius} px.'
  ],
  'formula.current-effects.heating.meaning': [
    "The current setting changes the drawing's glow. The pulse changes with animation time while Run is active.",
    "धारा नियंत्रण चित्र की चमक बदलता है। 'चलाएँ' सक्रिय होने पर एनिमेशन समय के साथ स्पंद बदलता है।"
  ],
  'formula.current-effects.heating.example': [
    'The glow is a visual hint: a larger current setting makes the model look brighter.',
    'चमक एक दृश्य संकेत है: अधिक धारा का मान मॉडल को अधिक चमकदार दिखाता है।'
  ],
  'formula.current-effects.heating.note': [
    'These are canvas drawing values, not real temperature or power. Resistance is not a control, so no heating-energy formula is calculated.',
    'ये कैनवास चित्र के मान हैं, वास्तविक तापमान या शक्ति नहीं। प्रतिरोध नियंत्रण में नहीं है, अतः ऊष्मीय ऊर्जा का सूत्र परिकलित नहीं है।'
  ],

  // current-effects symbols
  'formula.current-effects.symbols.rule': [
    'No numerical formula is calculated in the symbol view.',
    'प्रतीक दृश्य में किसी संख्यात्मक सूत्र की गणना नहीं होती है।'
  ],
  'formula.current-effects.symbols.sub': [
    'This view labels a cell, bulb, switch, wire and fuse.',
    'यह दृश्य सेल, बल्ब, स्विच, तार और फ्यूज़ को दर्शाता है।'
  ],
  'formula.current-effects.symbols.res': [
    'Standard circuit symbols (illustrative layout).',
    'मानक परिपथ चिह्न (चित्रात्मक रूप)।'
  ],
  'formula.current-effects.symbols.meaning': [
    'Standard symbols make circuit diagrams simpler to read and draw than realistic pictures.',
    'मानक चिह्न परिपथ आरेखों को वास्तविक चित्रों की तुलना में पढ़ने और बनाने में आसान बनाते हैं।'
  ],
  'formula.current-effects.symbols.example': [
    'A circuit diagram uses a long line and a short thick line to stand for an electric cell.',
    'परिपथ आरेख में विद्युत सेल को एक लंबी रेखा और एक छोटी-मोटी रेखा से दिखाया जाता है।'
  ],
  'formula.current-effects.symbols.note': [
    'The symbols follow standard school diagrams. Current and turns sliders are inactive in this view.',
    'चिह्न मानक विद्यालयीय आरेखों के अनुसार हैं। इस दृश्य में धारा और फेरों के स्लाइडर निष्क्रिय रहते हैं।'
  ],

  // current-effects magnetic
  'formula.current-effects.magnetic.rule': [
    'Qualitative relation: current in a coil → magnetic effect\nMore turns and current can make a stronger electromagnet.',
    'गुणात्मक संबंध: कुंडली में धारा → चुंबकीय प्रभाव\nअधिक फेरे और धारा मिलकर अधिक शक्तिशाली विद्युत चुंबक बनाते हैं।'
  ],
  'formula.current-effects.magnetic.sub': [
    'Selected demonstration = {effect}; current = {current} A; coil turns = {turns}.',
    'चुना हुआ प्रदर्शन = {effect}; धारा = {current} A; कुंडली के फेरे = {turns}।'
  ],
  'formula.current-effects.magnetic.res': [
    '{effect} model with {turns} turns at {current} A.',
    '{current} A पर {turns} फेरों वाला {effect} मॉडल।'
  ],
  'formula.current-effects.magnetic.meaning': [
    'Electric current produces a magnetic field around the wire. Coiling the wire concentrates this effect.',
    'विद्युत धारा तार के चारों ओर चुंबकीय क्षेत्र बनाती है। तार को लपेटने से यह प्रभाव केंद्रित हो जाता है।'
  ],
  'formula.current-effects.magnetic.example': [
    'An electric bell uses an electromagnet to pull an armature and strike a gong repeatedly.',
    'बिजली की घंटी में एक विद्युत चुंबक आर्मेचर को खींचकर बार-बार घंटी पर चोट करता है।'
  ],
  'formula.current-effects.magnetic.note': [
    'This model demonstrates how the parts interact; it does not calculate magnetic field strength (tesla) or force in newtons.',
    'यह मॉडल दिखाता है कि भाग कैसे कार्य करते हैं; यह चुंबकीय क्षेत्र (टेस्ला) या बल (न्यूटन) की गणना नहीं करता।'
  ],

  // light prism
  'formula.light.prism.rule': [
    'White light → a spread of seven visible colour bands\n(no wavelength or angle calculation)',
    'श्वेत प्रकाश → सात दृश्य रंगों की पट्टी (वर्णक्रम)\n(तरंगदैर्घ्य या कोण की कोई गणना नहीं)'
  ],
  'formula.light.prism.sub': [
    'White light ray enters the prism and disperses.',
    'श्वेत प्रकाश किरण प्रिज़्म में प्रवेश करती है और विक्षेपित होती है।'
  ],
  'formula.light.prism.res': [
    'Separation into red, orange, yellow, green, blue, indigo and violet.',
    'लाल, नारंगी, पीला, हरा, नीला, जामुनी और बैंगनी रंगों में विभाजन।'
  ],
  'formula.light.prism.meaning': [
    'Different colours bend by slightly different amounts when entering and leaving the prism, spreading white light into a spectrum.',
    'प्रिज़्म में प्रवेश करते और निकलते समय अलग-अलग रंग थोड़ा अलग मुड़ते हैं, जिससे श्वेत प्रकाश वर्णक्रम में फैल जाता है।'
  ],
  'formula.light.prism.example': [
    'Sunlight passing through raindrops can form a rainbow in the same way.',
    'वर्षा की बूँदों से गुजरने वाली धूप भी इसी तरह इंद्रधनुष बनाती है।'
  ],
  'formula.light.prism.note': [
    'This is a qualitative display of dispersion. Refractive index and prism angle are not simulated numerically.',
    'यह विक्षेपण का गुणात्मक प्रदर्शन है। अपवर्तनांक और प्रिज़्म कोण की संख्यात्मक गणना नहीं की गई है।'
  ],

  // light mirror
  'formula.light.mirror.rule': [
    'dᵢ = dₒ; hᵢ = hₒ\n(plane-mirror image)',
    'dᵢ = dₒ; hᵢ = hₒ\n(समतल दर्पण प्रतिबिंब)'
  ],
  'formula.light.mirror.sub': [
    'dₒ = {object} units; hₒ = {height} units\ntherefore dᵢ = {object} units and hᵢ = {height} units.',
    'dₒ = {object} इकाई; hₒ = {height} इकाई\nअतः dᵢ = {object} इकाई और hᵢ = {height} इकाई।'
  ],
  'formula.light.mirror.res': [
    'Virtual, upright image {object} units behind the mirror; same height ({height} units).',
    'आभासी, सीधा प्रतिबिंब दर्पण के पीछे {object} इकाई पर; समान ऊँचाई ({height} इकाई)।'
  ],
  'formula.light.mirror.meaning': [
    'The image appears behind the mirror at the same distance as the object is in front.',
    'प्रतिबिंब दर्पण के पीछे उतनी ही दूरी पर दिखता है जितनी दूरी पर वस्तु सामने होती है।'
  ],
  'formula.light.mirror.example': [
    'Stand {object} steps from a mirror and your reflection appears about {object} steps behind it.',
    'दर्पण से {object} कदम दूर खड़े होने पर आपका प्रतिबिंब भी लगभग {object} कदम पीछे दिखता है।'
  ],
  'formula.light.mirror.note': [
    'The ray sketch is idealized and the screen drawing is not to scale.',
    'किरण आरेख आदर्श है और स्क्रीन चित्र माप के अनुसार नहीं है।'
  ],

  // light diverging
  'formula.light.diverging.rule': [
    'Virtual image magnitude: |dᵢ| = f dₒ ÷ (f + dₒ)\n|hᵢ| = hₒ × |dᵢ| ÷ dₒ',
    'आभासी प्रतिबिंब परिमाण: |dᵢ| = f dₒ ÷ (f + dₒ)\n|hᵢ| = hₒ × |dᵢ| ÷ dₒ'
  ],
  'formula.light.diverging.sub': [
    'f = {focal} units; dₒ = {object} units; hₒ = {height} units\n|dᵢ| = ({focal} × {object}) ÷ ({focal} + {object}) = {image} units\n|hᵢ| = {height} × {image} ÷ {object} = {imageHeight} units.',
    'f = {focal} इकाई; dₒ = {object} इकाई; hₒ = {height} इकाई\n|dᵢ| = ({focal} × {object}) ÷ ({focal} + {object}) = {image} इकाई\n|hᵢ| = {height} × {image} ÷ {object} = {imageHeight} इकाई।'
  ],
  'formula.light.diverging.res': [
    '{element}: virtual, upright image at distance {image} units, height {imageHeight} units.',
    '{element}: आभासी, सीधा प्रतिबिंब दूरी {image} इकाई पर, ऊँचाई {imageHeight} इकाई।'
  ],
  'formula.light.diverging.meaning': [
    'Diverging elements form upright, diminished virtual images for real objects at any distance.',
    'अपसारी उपकरण किसी भी दूरी पर रखी वास्तविक वस्तु के लिए सीधा, छोटा और आभासी प्रतिबिंब बनाते हैं।'
  ],
  'formula.light.diverging.example': [
    'A vehicle rear-view mirror uses a convex mirror to give an upright, wider field of view.',
    'वाहनों के पीछे देखने वाले दर्पण में उत्तल दर्पण का उपयोग सीधा और विस्तृत दृश्य क्षेत्र पाने के लिए किया जाता है।'
  ],
  'formula.light.diverging.note': [
    'Thick-lens effects and aberrations are omitted in this school-level model.',
    'इस विद्यालयीय मॉडल में मोटे लेंस के प्रभाव और विपथन छोड़ दिए गए हैं।'
  ],

  // light curved
  'formula.light.curved.rule': [
    'Thin-mirror/lens relation (ideal): {formula}\nImage height uses magnification; display is capped for learning.',
    'पतले दर्पण/लेंस का संबंध (आदर्श): {formula}\nप्रतिबिंब की ऊँचाई आवर्धन का उपयोग करती है; प्रदर्शन को सीमित रखा गया है।'
  ],
  'formula.light.curved.sub': [
    '{element}: f = {focal} units; dₒ = {object} units; hₒ = {height} units.\nimage distance = {imageText}; height = {imageHeight} units.',
    '{element}: f = {focal} इकाई; dₒ = {object} इकाई; hₒ = {height} इकाई।\nप्रतिबिंब दूरी = {imageText}; ऊँचाई = {imageHeight} इकाई।'
  ],
  'formula.light.curved.res': [
    '{element} → image distance: {imageText}; image height: {imageHeight} units.',
    '{element} → प्रतिबिंब दूरी: {imageText}; प्रतिबिंब ऊँचाई: {imageHeight} इकाई।'
  ],
  'formula.light.curved.meaning': [
    'When the object is beyond the focal point, the image is real and inverted; inside the focal point it becomes virtual and upright.',
    'जब वस्तु फोकस बिंदु से परे होती है, तो प्रतिबिंब वास्तविक और उल्टा बनता है; फोकस के भीतर होने पर यह आभासी और सीधा बन जाता है।'
  ],
  'formula.light.curved.example': [
    'A magnifying glass uses a convex lens close to an object to form a magnified upright virtual image.',
    'आवर्धक लेंस वस्तु के पास उत्तल लेंस रखकर बड़ा, सीधा और आभासी प्रतिबिंब बनाता है।'
  ],
  'formula.light.curved.note': [
    'Values are qualitative canvas units. The drawing caps ray extremes to stay within view.',
    'मान गुणात्मक कैनवास इकाइयों में हैं। चित्र किरणों को स्क्रीन के भीतर रखने के लिए चरम सीमाओं को सीमित करता है।'
  ],

  // electric-effects
  'formula.electric-effects.rule': [
    'Current path complete = switch closed AND liquid conducts\nCoating shown = electroplating selected AND path complete',
    'विद्युत परिपथ पूर्ण = स्विच बंद तथा द्रव चालक\nपरत दिखना = विद्युत-लेपन चयनित तथा परिपथ पूर्ण'
  ],
  'formula.electric-effects.sub': [
    'Switch = {switch}; liquid = {liquid} ({conducts}); effect = {effect}.',
    'स्विच = {switch}; द्रव = {liquid} ({conducts}); प्रभाव = {effect}।'
  ],
  'formula.electric-effects.res': [
    'Path {conductsText} · coating {coatingText}.',
    'मार्ग {conductsText} · परत {coatingText}।'
  ],
  'formula.electric-effects.meaning': [
    'The diagram treats salt and lemon solutions as conducting; only electroplating mode shows a coating when the switch is closed.',
    'यह आरेख नमक और नींबू के घोल को चालक मानता है; केवल विद्युत-लेपन मोड स्विच बंद होने पर परत दिखाता है।'
  ],
  'formula.electric-effects.example': [
    'In a real electroplating setup, current can help deposit a thin metal layer on an object.',
    'वास्तविक विद्युत-लेपन में विद्युत धारा किसी वस्तु पर धातु की पतली परत चढ़ाने में मदद करती है।'
  ],
  'formula.electric-effects.note': [
    'This model calculates no voltage, current, chemical amount or coating thickness. It is not a real experiment.',
    'यह मॉडल वोल्टेज, धारा, रासायनिक मात्रा या परत की मोटाई की गणना नहीं करता। यह वास्तविक प्रयोग नहीं है।'
  ],

  // forces push
  'formula.forces.push.rule': [
    'Illustrative arrow offset = 45 px + (5 px/N × force setting)',
    'चित्रात्मक तीर विस्थापन = 45 px + (5 px/N × बल मान)'
  ],
  'formula.forces.push.sub': [
    'Force type = {force}; setting = {setting} N; surface = {surface}.\narrow offset = 45 + (5 × {setting}) = {offset} px',
    'बल का प्रकार = {force}; मान = {setting} N; सतह = {surface}।\nतीर विस्थापन = 45 + (5 × {setting}) = {offset} px'
  ],
  'formula.forces.push.res': [
    '{setting} N illustrative setting · contact force; push-arrow offset {offset} px.',
    '{setting} N चित्रात्मक मान · संपर्क बल; धक्का-तीर विस्थापन {offset} px।'
  ],
  'formula.forces.push.meaning': [
    'The selection shows whether objects touch. Only the muscular-push view scales its arrow with the strength slider.',
    'चयन दिखाता है कि वस्तुएँ स्पर्श करती हैं या नहीं। केवल पेशीय धक्का दृश्य ही स्लाइडर के साथ तीर के आकार को बदलता है।'
  ],
  'formula.forces.push.example': [
    'A stronger push can make a cart speed up, while friction acts where the cart and floor touch.',
    'अधिक ज़ोर से धक्का देने पर गाड़ी तेज़ हो सकती है, जबकि गाड़ी और फर्श के संपर्क स्थान पर घर्षण कार्य करता है।'
  ],
  'formula.forces.push.note': [
    'The arrow scale is a drawing aid. Mass and acceleration are not simulated, so F = ma is not calculated.',
    'तीर का पैमाना केवल समझाने के लिए है। द्रव्यमान और त्वरण का अनुकरण नहीं किया गया है, अतः F = ma की गणना नहीं होती।'
  ],

  // forces other
  'formula.forces.other.rule': [
    'Model rule: muscular push and friction require contact; magnetic, electrostatic and gravity act across space.',
    'मॉडल नियम: पेशीय धक्का और घर्षण में संपर्क चाहिए; चुंबकीय, स्थिर-वैद्युत और गुरुत्व बिना संपर्क दूरी से लगते हैं।'
  ],
  'formula.forces.other.sub': [
    'Force = {force}; surface = {surface}; strength slider = {setting} N.',
    'बल = {force}; सतह = {surface}; परिमाण स्लाइडर = {setting} N.'
  ],
  'formula.forces.other.res': [
    '{force} is a {type} force (strength slider is illustrative in this view).',
    '{force} एक {type} है (इस दृश्य में परिमाण स्लाइडर केवल चित्रात्मक है)।'
  ],
  'formula.forces.other.meaning': [
    'Non-contact forces act through fields without physical touching, while contact forces occur at touching surfaces.',
    'असंपर्क बल बिना छुए दूरी से कार्य करते हैं, जबकि संपर्क बल स्पर्श करने वाली सतहों पर लगते हैं।'
  ],
  'formula.forces.other.example': [
    'The Earth pulls on a falling ball without touching it (gravity); friction slows a sliding book where it touches a desk.',
    'पृथ्वी गिरती गेंद को बिना छुए खींचती है (गुरुत्वाकर्षण); मेज़ को छूती फिसलती किताब को घर्षण धीमा करता है।'
  ],
  'formula.forces.other.note': [
    'Gravitational constant, charges and magnetic dipole equations are omitted; this is a qualitative comparison.',
    'गुरुत्वाकर्षण नियतांक, आवेश और चुंबकीय द्विध्रुव समीकरण छोड़ दिए गए हैं; यह एक गुणात्मक तुलना है।'
  ],

  // pressure-weather surface
  'formula.pressure-weather.surface.rule': [
    'Pressure = force ÷ area  (P = F/A)',
    'दाब = बल ÷ क्षेत्रफल  (P = F/A)'
  ],
  'formula.pressure-weather.surface.sub': [
    'P = {force} N ÷ {area} cm² = {pressure} N/cm²',
    'P = {force} N ÷ {area} cm² = {pressure} N/cm²'
  ],
  'formula.pressure-weather.surface.res': [
    'Surface pressure = {pressure} N/cm².',
    'सतही दाब = {pressure} N/cm².'
  ],
  'formula.pressure-weather.surface.meaning': [
    'For the same force, spreading it over a larger area lowers the pressure.',
    'समान बल के लिए, अधिक क्षेत्रफल पर फैलाने से दाब कम हो जाता है।'
  ],
  'formula.pressure-weather.surface.example': [
    'A {force} N load on {area} cm² gives {pressure} N/cm² in this model.',
    'इस मॉडल में {area} cm² पर {force} N भार से {pressure} N/cm² दाब मिलता है।'
  ],
  'formula.pressure-weather.surface.note': [
    'This uses the displayed area and reports N/cm²; atmospheric pressure is discussed but not calculated.',
    'यह प्रदर्शित क्षेत्रफल का उपयोग कर N/cm² बताता है; वायुमंडलीय दाब की चर्चा है पर गणना नहीं।'
  ],

  // pressure-weather fluid
  'formula.pressure-weather.fluid.rule': [
    'Fluid pressure increases with depth (qualitative).\nIllustration arrow reach = 18 px + 4 px/m × depth',
    'गहराई के साथ द्रव दाब बढ़ता है (गुणात्मक)।\nचित्रात्मक तीर लंबाई = 18 px + 4 px/m × गहराई'
  ],
  'formula.pressure-weather.fluid.sub': [
    'depth = {depth} m\narrow reach = 18 + (4 × {depth}) = {arrowLength} px',
    'गहराई = {depth} m\nतीर लंबाई = 18 + (4 × {depth}) = {arrowLength} px'
  ],
  'formula.pressure-weather.fluid.res': [
    'At {depth} m depth, drawn pressure arrows extend {arrowLength} px.',
    '{depth} m गहराई पर, खींचे गए दाब तीर {arrowLength} px तक बढ़ते हैं।'
  ],
  'formula.pressure-weather.fluid.meaning': [
    'Deeper liquid supports the weight of the liquid above, so pressure increases steadily with depth.',
    'गहराई में द्रव अपने ऊपर के द्रव का भार संभालता है, इसलिए गहराई के साथ दाब बढ़ता जाता है।'
  ],
  'formula.pressure-weather.fluid.example': [
    'Dams are built much thicker at the base than at the top to withstand greater water pressure at depth.',
    'बाँधों की दीवारें नीचे अधिक मोटी बनाई जाती हैं ताकि गहराई में पानी के अधिक दाब को झेल सकें।'
  ],
  'formula.pressure-weather.fluid.note': [
    'Liquid density (ρ) and g are not varied; arrows show relative change rather than pascals (Pa).',
    'द्रव का घनत्व (ρ) और g बदले नहीं गए हैं; तीर पास्कल (Pa) के बजाय सापेक्ष परिवर्तन दिखाते हैं।'
  ],

  // pressure-weather cyclone
  'formula.pressure-weather.cyclone.rule': [
    'Cyclone drawing rotation = 0.12 rad/s × animation time',
    'चक्रवात चित्र घूर्णन = 0.12 rad/s × एनिमेशन समय'
  ],
  'formula.pressure-weather.cyclone.sub': [
    'rotation = 0.12 × {time} = {rotation} rad\nLow-pressure centre labelled at canvas center.',
    'घूर्णन = 0.12 × {time} = {rotation} rad\nकैनवास के केंद्र में कम दाब का क्षेत्र चिह्नित है।'
  ],
  'formula.pressure-weather.cyclone.res': [
    'Spiral bands rotate around the low-pressure centre.',
    'कम दाब वाले केंद्र के चारों ओर चक्राकार पट्टियाँ घूमती हैं।'
  ],
  'formula.pressure-weather.cyclone.meaning': [
    "Winds spiral inward toward a very low pressure region, deflected by Earth's rotation to form a cyclone system.",
    'हवाएँ बहुत कम दाब वाले क्षेत्र की ओर अंदर की ओर घूमती हैं और चक्रवात प्रणाली बनाती हैं।'
  ],
  'formula.pressure-weather.cyclone.example': [
    'Tropical cyclones over warm oceans can bring high-speed winds and heavy rainfall to coastal regions.',
    'गर्म समुद्रों पर बनने वाले उष्णकटिबंधीय चक्रवात तटीय क्षेत्रों में तेज़ हवाएँ और भारी वर्षा लाते हैं।'
  ],
  'formula.pressure-weather.cyclone.note': [
    'This is a conceptual animated sketch. It does not predict weather, track real storms or calculate Coriolis force.',
    'यह एक अवधारणात्मक एनिमेटेड चित्र है। यह मौसम का पूर्वानुमान नहीं करता और न ही वास्तविक तूफ़ान की गणना करता है।'
  ],

  // pressure-weather wind
  'formula.pressure-weather.wind.rule': [
    'Uneven heating → air moves → wind (qualitative model)',
    'असमान तापन → हवा की गति → पवन (गुणात्मक मॉडल)'
  ],
  'formula.pressure-weather.wind.sub': [
    'Selected view = {demo}; warm land/sea convection cycle illustrated.',
    'चुना हुआ दृश्य = {demo}; थल/समुद्र संवहन चक्र का चित्रण।'
  ],
  'formula.pressure-weather.wind.res': [
    'Convection loops show warm air rising and cooler air moving in.',
    'संवहन चक्र गर्म हवा को ऊपर उठते और ठंडी हवा को आते दिखाते हैं।'
  ],
  'formula.pressure-weather.wind.meaning': [
    'Sunlight warms different regions unevenly. Warm air expands and rises, creating a low-pressure area that cooler air rushes in to fill.',
    'सूर्य का प्रकाश अलग-अलग क्षेत्रों को असमान रूप से गर्म करता है। गर्म हवा ऊपर उठती है और ठंडी हवा उस खाली स्थान को भरने आती है।'
  ],
  'formula.pressure-weather.wind.example': [
    'Coastal sea breezes blow from sea to land during the day because land warms faster than water.',
    'दिन के समय समुद्र से थल की ओर समीर चलती है क्योंकि थल पानी की तुलना में जल्दी गर्म होता है।'
  ],
  'formula.pressure-weather.wind.note': [
    'Specific wind speeds and barometric millibars are not computed; force, area and depth sliders are not used in the wind-current drawing.',
    'विशिष्ट पवन चाल और वायुदाब की गणना नहीं होती; पवन-धारा चित्र में बल, क्षेत्रफल और गहराई स्लाइडर प्रयुक्त नहीं होते।'
  ],

  // sound
  'formula.sound.rule': [
    'Period = 1 ÷ frequency  (T = 1/f)\nDisplayed wave amplitude = 3.1 px × amplitude setting',
    'आवर्तकाल = 1 ÷ आवृत्ति  (T = 1/f)\nप्रदर्शित तरंग आयाम = 3.1 px × आयाम मान'
  ],
  'formula.sound.sub': [
    'T = 1 ÷ {frequency} Hz = {period} s\nvisual amplitude = 3.1 × {amplitude} = {visualAmplitude} px\nMedium = {medium}; sound type = {soundtype}.',
    'T = 1 ÷ {frequency} Hz = {period} s\nदृश्य आयाम = 3.1 × {amplitude} = {visualAmplitude} px\nमाध्यम = {medium}; ध्वनि का प्रकार = {soundtype}।'
  ],
  'formula.sound.res': [
    'Period {periodMs} ms · wave height {visualAmplitude} px · {range}.',
    'आवर्तकाल {periodMs} ms · तरंग ऊँचाई {visualAmplitude} px · {range}।'
  ],
  'formula.sound.meaning': [
    'Higher frequency means higher pitch; a larger amplitude makes a taller drawn wave and represents louder sound.',
    'अधिक आवृत्ति का अर्थ है उच्च तारत्व; बड़ा आयाम ऊँची तरंग बनाता है और अधिक प्रबल (तेज़) ध्वनि को दर्शाता है।'
  ],
  'formula.sound.example': [
    'At {frequency} Hz, one cycle takes about {periodMs} ms. A familiar musical A is near 440 Hz.',
    '{frequency} Hz पर, एक चक्र में लगभग {periodMs} ms लगते हैं। संगीत का जाना-पहचाना सुर \'A\' 440 Hz के पास होता है।'
  ],
  'formula.sound.note': [
    'The derived period matches the frequency setting, but the drawn wave is not timed to that real frequency. Wave height is a canvas scale, not measured sound level; the simulation makes no sound.',
    'प्राप्त आवर्तकाल आवृत्ति नियंत्रण से मेल खाता है, पर बनाई गई तरंग वास्तविक आवृत्ति के समय पर नहीं है। चित्र का आयाम कैनवास का पैमाना है, ध्वनि स्तर नहीं; सिमुलेशन में कोई आवाज़ नहीं होती।'
  ],

  // reflection-eye
  'formula.reflection-eye.rule': [
    'Approximate images between two mirrors:\nN ≈ max(1, ceil(360° ÷ angle) − 1)',
    'दो दर्पणों के बीच अनुमानित प्रतिबिंब:\nN ≈ max(1, ceil(360° ÷ कोण) − 1)'
  ],
  'formula.reflection-eye.sub': [
    'N ≈ max(1, ceil(360° ÷ {angle}°) − 1) = {idealCount}\nRays selected = {rays}; surface = {surface}.',
    'N ≈ max(1, ceil(360° ÷ {angle}°) − 1) = {idealCount}\nचुनी गई किरणें = {rays}; सतह = {surface}।'
  ],
  'formula.reflection-eye.res': [
    'About {idealCount} images by the model rule; {shownCount} image marks are drawn.',
    'मॉडल नियम से लगभग {idealCount} प्रतिबिंब; {shownCount} प्रतिबिंब निशान बनाए गए हैं।'
  ],
  'formula.reflection-eye.meaning': [
    'A smaller angle lets light reflect back and forth more times, so more images can appear.',
    'छोटा कोण प्रकाश को आगे-पीछे अधिक बार परावर्तित होने देता है, जिससे अधिक प्रतिबिंब बन सकते हैं।'
  ],
  'formula.reflection-eye.example': [
    'At {angle}°, the idealized rule gives about {idealCount} images.',
    '{angle}° पर आदर्श नियम से लगभग {idealCount} प्रतिबिंब प्राप्त होते हैं।'
  ],
  'formula.reflection-eye.note': [
    'Image count is an ideal geometry estimate and the drawing caps visible marks at 10. The eye diagram is a separate, simplified illustration.',
    'प्रतिबिंबों की संख्या एक आदर्श ज्यामितीय अनुमान है और चित्र में अधिकतम 10 निशान ही दिखाए जाते हैं। आँख का चित्र एक अलग, सरल चित्रण है।'
  ],

  // natural-phenomena earthquake
  'formula.natural-phenomena.earthquake.rule': [
    'First wave-ring radius in the drawing = (38 px/s × elapsed time) mod 130 px',
    'चित्र में पहली तरंग का दायरा = (38 px/s × बीता समय) mod 130 px'
  ],
  'formula.natural-phenomena.earthquake.sub': [
    'elapsed = {time} s\nradius = (38 × {time}) mod 130 = {radius} px',
    'बीता समय = {time} s\nदायरा = (38 × {time}) mod 130 = {radius} px'
  ],
  'formula.natural-phenomena.earthquake.res': [
    'Illustrated wave-ring radius: {radius} px from the underground focus.',
    'चित्रात्मक तरंग दायरा: भूमिगत उद्गम-केंद्र से {radius} px।'
  ],
  'formula.natural-phenomena.earthquake.meaning': [
    'The rings spread outward from the focus; the point above it at the surface is the epicentre.',
    'तरंगें उद्गम-केंद्र से बाहर की ओर फैलती हैं; इसके ठीक ऊपर धरती की सतह पर स्थित बिंदु अधिकेंद्र है।'
  ],
  'formula.natural-phenomena.earthquake.example': [
    'Ripples spreading from a point in a tray help picture waves spreading from an earthquake focus.',
    'ट्रे में पानी की बूँद से फैलने वाली तरंगें भूकंप-केंद्र से तरंगों के प्रसार को समझने में मदद करती हैं।'
  ],
  'formula.natural-phenomena.earthquake.note': [
    'Pixels per second is only animation speed, not real seismic-wave speed. The model is not a warning or forecast.',
    'पिक्सेल प्रति सेकंड केवल एनिमेशन की गति है, वास्तविक भूकंपीय तरंग की गति नहीं। यह मॉडल कोई चेतावनी या पूर्वानुमान नहीं है।'
  ],

  // natural-phenomena rubbing
  'formula.natural-phenomena.rubbing.rule': [
    'Illustrated charge-symbol count = charge setting',
    'चित्रात्मक आवेश चिह्नों की संख्या = आवेश मान'
  ],
  'formula.natural-phenomena.rubbing.sub': [
    'charge setting = {charge} illustrative units → {charge} symbols around the rubbed object.',
    'आवेश मान = {charge} चित्रात्मक इकाई → रगड़ी गई वस्तु के चारों ओर {charge} चिह्न।'
  ],
  'formula.natural-phenomena.rubbing.res': [
    '{charge} charge symbols; no charge in coulombs or force is calculated.',
    '{charge} आवेश चिह्न; कूलॉम में आवेश या बल की कोई गणना नहीं की गई है।'
  ],
  'formula.natural-phenomena.rubbing.meaning': [
    'Rubbing can transfer electrons and leave materials charged; the symbols represent charge, not individual electrons.',
    'रगड़ने से इलेक्ट्रॉन स्थानांतरित हो सकते हैं और पदार्थ आवेशित हो जाते हैं; ये चिह्न आवेश दर्शाते हैं, अलग-अलग इलेक्ट्रॉन नहीं।'
  ],
  'formula.natural-phenomena.rubbing.example': [
    'A rubbed balloon can attract small bits of paper.',
    'रगड़ा हुआ गुब्बारा कागज़ के छोटे टुकड़ों को आकर्षित कर सकता है।'
  ],
  'formula.natural-phenomena.rubbing.note': [
    'Charge symbols are a simple picture. The slider is not a measurement of real electric charge.',
    'आवेश चिह्न केवल एक सरल चित्र हैं। स्लाइडर वास्तविक विद्युत आवेश का माप नहीं है।'
  ],

  // natural-phenomena interaction
  'formula.natural-phenomena.interaction.rule': [
    'Unlike charges attract · like charges repel (qualitative rule)',
    'विपरीत आवेश आकर्षित होते हैं · समान आवेश प्रतिकर्षित होते हैं (गुणात्मक नियम)'
  ],
  'formula.natural-phenomena.interaction.sub': [
    'Charge pair = {relation}; symbol amount setting = {charge} illustrative units.',
    'आवेश जोड़ा = {relation}; चिह्न संख्या मान = {charge} चित्रात्मक इकाई।'
  ],
  'formula.natural-phenomena.interaction.res': [
    'The model shows the pair {action}.',
    'मॉडल इस जोड़े को {action} दिखाता है।'
  ],
  'formula.natural-phenomena.interaction.meaning': [
    'The signs of the charges determine whether they pull together or push apart.',
    'आवेशों के चिह्न तय करते हैं कि वे एक-दूसरे को खींचेंगे या धकेलेंगे।'
  ],
  'formula.natural-phenomena.interaction.example': [
    'A charged balloon can attract an oppositely charged surface.',
    'आवेशित गुब्बारा विपरीत आवेशित सतह को आकर्षित कर सकता है।'
  ],
  'formula.natural-phenomena.interaction.note': [
    'No electric force or charge value is calculated; lightning and earthquake views use different parts of the model.',
    'विद्युत बल या आवेश मान की गणना नहीं की गई है; बिजली और भूकंप दृश्य मॉडल के अलग हिस्सों का उपयोग करते हैं।'
  ],

  // natural-phenomena lightning
  'formula.natural-phenomena.lightning.rule': [
    'Lightning formation is shown as a conceptual charge separation and discharge.',
    'बिजली चमकने को अवधारणात्मक आवेश पृथक्करण और विसर्जन के रूप में दिखाया गया है।'
  ],
  'formula.natural-phenomena.lightning.sub': [
    'Explore view = {demo}; animation time = {time} s.',
    'दृश्य = {demo}; एनिमेशन समय = {time} s.'
  ],
  'formula.natural-phenomena.lightning.res': [
    'A lightning path flashes in the drawing; no voltage or energy is calculated.',
    'चित्र में बिजली का मार्ग चमकता है; वोल्टेज या ऊर्जा की कोई गणना नहीं है।'
  ],
  'formula.natural-phenomena.lightning.meaning': [
    'A lightning bolt is a large electric discharge between charged regions.',
    'तड़ित (बिजली) आवेशित क्षेत्रों के बीच एक विशाल विद्युत विसर्जन है।'
  ],
  'formula.natural-phenomena.lightning.example': [
    'During a storm, go indoors and stay away from water and open areas.',
    'तूफ़ान के समय घर के भीतर रहें और पानी तथा खुले स्थानों से दूर रहें।'
  ],
  'formula.natural-phenomena.lightning.note': [
    'The lightning model is not a forecast and does not calculate electric fields, voltage or discharge energy.',
    'यह बिजली मॉडल कोई पूर्वानुमान नहीं है और विद्युत क्षेत्र, वोल्टेज या विसर्जन ऊर्जा की गणना नहीं करता।'
  ],

  // default
  'formula.default.rule': [
    'No formula is available for this simulation.',
    'इस अनुकरण के लिए कोई सूत्र उपलब्ध नहीं है।'
  ],
  'formula.default.sub': [
    'None',
    'कोई नहीं'
  ],
  'formula.default.res': [
    'No calculated result',
    'कोई परिकलित परिणाम नहीं'
  ],
  'formula.default.meaning': [
    'No additional explanation is available for this mode.',
    'इस दृश्य के लिए कोई अतिरिक्त व्याख्या उपलब्ध नहीं है।'
  ],
  'formula.default.example': [
    'No familiar example is listed for this view.',
    'इस दृश्य के लिए कोई उदाहरण सूचीबद्ध नहीं है।'
  ],
  'formula.default.note': [
    'No model limits noted.',
    'कोई मॉडल सीमाएँ दर्ज नहीं हैं।'
  ],
};
  for (const [key, pair] of Object.entries(formulas)) {
    dictionaries.en[key] = pair[0];
    dictionaries.hi[key] = pair[1];
  }

  window.PHYSICS_I18N = {
    dictionaries,
    moduleIds: Object.keys(modules),
    lookup(language, key, params = {}) {
      const value = dictionaries[language]?.[key]
      if (typeof value !== 'string' || !value.trim()) {
        const error = `Missing Physics translation: ${language}.${key}`
        console.error(error)
        return `[[MISSING:${key}]]`
      }
      return value.replace(/\{([a-zA-Z0-9_]+)\}/g, (_, name) => String(params[name] ?? `⟦${name}⟧`))
    },
    canvasText(language, text) {
      if (!text || language === 'en') return text
      const normalize = (value) => String(value)
        .replace(/\u00c2/g, '')
        .replace(/[·•]/g, '·')
        .replace(/\s*·\s*/g, ' · ')
        .replace(/\u00a0/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
      let result = normalize(text)
      const lookupExact = (prefix, raw) => dictionaries[language][prefix + raw]
      const directCanvas = lookupExact('canvas.', normalize(text))
      if (directCanvas) return directCanvas
      const directCanvasNormalized = lookupExact('canvas.', result)
      if (directCanvasNormalized) return directCanvasNormalized

      // Complete phrases first, with exact or word-boundary matching.
      const labels = Object.keys(dictionaries.en)
        .filter(key => key.startsWith('canvas.'))
        .sort((a, b) => dictionaries.en[b].length - dictionaries.en[a].length)
      for (const key of labels) {
        const english = normalize(dictionaries.en[key].replace(/^canvas\./, '').replace(/\u00b7/g, '·'))
        const hindi = dictionaries[language][key]
        if (!english || english === hindi) continue
        const escaped = english.replace(/[-[\]{}()*+?.,\\^$|#]/g, '\\$&')
        const pattern = new RegExp('(^|[^A-Za-z0-9])(' + escaped + ')(?=$|[^A-Za-z0-9])', 'gi')
        result = result.replace(pattern, (_, before) => before + hindi)
      }

      // Supported option/state values are translated only at exact word boundaries.
      const valueKeys = Object.keys(dictionaries.en)
        .filter(key => key.startsWith('value.'))
        .sort((a, b) => dictionaries.en[b].length - dictionaries.en[a].length)
      for (const key of valueKeys) {
        const valEn = normalize(dictionaries.en[key])
        const valHi = dictionaries[language][key]
        if (!valEn || valHi === valEn) continue
        const escaped = valEn.replace(/[-[\]{}()*+?.,\\^$|#]/g, '\\$&')
        const pattern = new RegExp('(^|[^A-Za-z0-9])(' + escaped + ')(?=$|[^A-Za-z0-9])', 'gi')
        result = result.replace(pattern, (_, before) => before + valHi)
      }

      // Normalize any malformed degree/square units left in dynamic text.
      return result
        .replace(/cm\s*A?²/g, 'cm²')
        .replace(/N\/cm\s*A?²/g, 'N/cm²')
        .replace(/°C/g, '°C')
        .replace(/\u00b7/g, '·')
    },
    audit(requiredKeys) {
      const issues = []
      for (const key of requiredKeys) {
        for (const language of ['en','hi']) if (!dictionaries[language][key]?.trim()) issues.push(`${language}.${key}`)
      }
      for (const key of Object.keys(dictionaries.en)) if (!(key in dictionaries.hi)) issues.push(`hi.${key}`)
      for (const key of Object.keys(dictionaries.hi)) if (!(key in dictionaries.en)) issues.push(`en.${key}`)
      return issues
    },
  }
})()
