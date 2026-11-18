(() => {
  const entries = {
    'page.title': ['Chemistry Virtual Lab', 'रसायन विज्ञान आभासी प्रयोगशाला'],
    'brand.name': ['Chemistry Lab', 'रसायन विज्ञान प्रयोगशाला'],
    'brand.tagline': ['Curiosity · Classes 6–8', 'जिज्ञासा · कक्षा 6–8'],
    'navigation.label': ['Chemistry lab modules', 'रसायन विज्ञान प्रयोगशालाएँ'],
    'navigation.classPicker': ['Choose your class', 'अपनी कक्षा चुनें'],
    'navigation.class6': ['Class 6', 'कक्षा 6'],
    'navigation.class7': ['Class 7', 'कक्षा 7'],
    'navigation.class8': ['Class 8', 'कक्षा 8'],
    'navigation.curiosity': ['Curiosity', 'जिज्ञासा'],
    'navigation.sidebarNote': ['Explore one idea at a time. Make a prediction, run the model, then describe what you noticed.', 'एक समय में एक विचार खोजें। अनुमान लगाएँ, मॉडल चलाएँ और फिर बताएं कि आपने क्या देखा।'],
    'navigation.learningSpace': ['Learning space', 'सीखने का स्थान'],
    'navigation.chemistryLab': ['Chemistry virtual lab', 'रसायन विज्ञान आभासी प्रयोगशाला'],
    'navigation.breadcrumb': ['Learning space › Chemistry virtual lab', 'सीखने का स्थान › रसायन विज्ञान आभासी प्रयोगशाला'],
    'navigation.offline': ['Works offline', 'ऑफ़लाइन भी काम करता है'],
    'module.topic': ['TOPIC', 'विषय'],
    'controls.label': ['Simulation controls', 'अनुकरण नियंत्रण'],
    'controls.heading': ['Set up your experiment', 'अपना प्रयोग तैयार करें'],
    'controls.predict': ['Predict', 'अनुमान'],
    'controls.predictStep': ['01 · Predict', '01 · अनुमान'],
    'controls.predictionPrompt': ['Before you run it, what do you predict?', 'इसे चलाने से पहले आपका अनुमान क्या है?'],
    'controls.choosePrediction': ['Choose your prediction…', 'अपना अनुमान चुनें…'],
    'controls.run': ['▶ Run simulation', '▶ अनुकरण चलाएँ'],
    'controls.reset': ['Reset', 'रीसेट करें'],
    'controls.another': ['Try another setting', 'दूसरी सेटिंग आज़माएँ'],
    'controls.footnote': ['Controls are keyboard and touch accessible. Model outputs are labelled as observations or calculations.', 'नियंत्रण कीबोर्ड और स्पर्श से उपयोग किए जा सकते हैं। मॉडल के परिणामों को अवलोकन या गणना के रूप में बताया गया है।'],
    'simulation.bench': ['Virtual bench', 'आभासी प्रयोग-मंच'],
    'simulation.live': ['LIVE MODEL', 'सक्रिय मॉडल'],
    'simulation.adjust': ['Adjust the controls and make a prediction. Your model updates as you explore.', 'नियंत्रण बदलें और अनुमान लगाएँ। खोज करते समय मॉडल अद्यतन होता रहेगा।'],
    'explanation.heading': ['What is happening?', 'क्या हो रहा है?'],
    'observation.prompt': ['After your attempt: what did you observe?', 'प्रयोग के बाद आपने क्या देखा?'],
    'observation.choose': ['Choose an observation…', 'एक अवलोकन चुनें…'],
    'observation.good': ['Good observation—you connected what changed to how the model works.', 'अच्छा अवलोकन—आपने बदलाव को मॉडल के काम करने के तरीके से जोड़ा।'],
    'observation.incorrect': ['Not quite. Compare your observation with the live labels and explanation, then try again.', 'अभी सही नहीं। अपने अवलोकन की तुलना मॉडल के संकेतों और व्याख्या से करें, फिर प्रयास करें।'],
    'observation.afterRun': ['Choose an observation to check your thinking.', 'अपनी समझ जाँचने के लिए एक अवलोकन चुनें।'],
    'observation.beforeRun': ['Run the simulation, then record what you noticed.', 'अनुकरण चलाएँ, फिर जो देखा उसे दर्ज करें।'],
    'prediction.correct': ['Prediction check: {{choice}} matches the model’s expected outcome.', 'अनुमान जाँच: {{choice}} मॉडल के अपेक्षित परिणाम से मेल खाता है।'],
    'prediction.incorrect': ['Prediction check: you chose {{choice}}. Compare the model with your prediction and see what you would change next time.', 'अनुमान जाँच: आपने {{choice}} चुना। मॉडल की तुलना अपने अनुमान से करें और सोचें कि अगली बार क्या बदलेंगे।'],
    'answer.beforeRun': ['Choose your settings, make a prediction, then run the simulation to reveal what is happening.', 'सेटिंग चुनें, अनुमान लगाएँ और फिर अनुकरण चलाकर देखें कि क्या होता है।'],
    'field.material': ['Material to test', 'जाँचने की सामग्री'],
    'field.compare': ['Compare it with', 'इससे तुलना करें'],
    'field.temperatureC': ['Temperature in Celsius', 'सेल्सियस में तापमान'],
    'field.waterTemperature': ['Water temperature', 'पानी का तापमान'],
    'field.waterStage': ['Water-cycle stage', 'जल-चक्र का चरण'],
    'field.separationMethod': ['Separation method', 'पृथक्करण विधि'],
    'field.mixtureAmount': ['Mixture amount', 'मिश्रण की मात्रा'],
    'field.airflow': ['Air flow', 'वायु प्रवाह'],
    'field.exploreTopic': ['Explore a topic', 'विषय का अन्वेषण करें'],
    'field.classifyResource': ['Classify this resource', 'इस संसाधन का वर्गीकरण करें'],
    'field.substance': ['Virtual substance', 'आभासी पदार्थ'],
    'field.indicator': ['Indicator', 'सूचक'],
    'field.compareMaterial': ['Material to compare', 'तुलना करने की सामग्री'],
    'field.change': ['Change to explore', 'बदलाव का अन्वेषण करें'],
    'field.state': ['State of matter', 'पदार्थ की अवस्था'],
    'field.diffusion': ['Diffusion progress', 'विसरण की प्रगति'],
    'field.example': ['Example to classify', 'वर्गीकृत करने का उदाहरण'],
    'field.particleModel': ['Show particle model', 'कणों का मॉडल दिखाएँ'],
    'field.solute': ['Solute', 'विलेय'],
    'field.solvent': ['Solvent', 'विलायक'],
    'field.stirring': ['Stirring', 'हिलाना'],
    'field.temperature': ['Temperature', 'तापमान'],
    'field.soluteMass': ['Solute mass (optional)', 'विलेय का द्रव्यमान (वैकल्पिक)'],
    'field.solutionMass': ['Total solution mass (optional)', 'घोल का कुल द्रव्यमान (वैकल्पिक)'],
    'help.slider': ['Move the slider or use arrow keys.', 'स्लाइडर खिसकाएँ या तीर कुंजियों का उपयोग करें।'],
    'help.pressure': ['Reference points shown at normal atmospheric pressure.', 'संदर्भ बिंदु सामान्य वायुमंडलीय दाब पर दिखाए गए हैं।'],
    'help.winnowing': ['Adjust airflow to see light chaff move away.', 'हल्की भूसी को अलग होते देखने के लिए वायु प्रवाह बदलें।'],
    'help.filtration': ['Model a sand-and-water mixture passed through a filter.', 'रेत और पानी के मिश्रण को छन्नी से छानने का मॉडल।'],
    'help.handpicking': ['Model a grain mixture with larger visible stones.', 'दिखाई देने वाले बड़े कंकड़ों वाले अनाज-मिश्रण का मॉडल।'],
    'help.acids': ['Results are qualitative; no exact pH is assigned to these generic samples.', 'परिणाम गुणात्मक हैं; इन सामान्य नमूनों के लिए कोई सटीक pH नहीं दिया गया है।'],
    'help.rust': ['Exposure to air', 'हवा के संपर्क में'],
    'help.moisture': ['Water or moisture present', 'पानी या नमी मौजूद है'],
    'help.combustion': ['Conceptual particle model only—no instructions for starting a fire.', 'यह केवल कणों का वैचारिक मॉडल है—आग जलाने के निर्देश नहीं।'],
    'help.physicalChange': ['Classify the change by asking whether a new substance forms.', 'देखें कि नया पदार्थ बनता है या नहीं, फिर बदलाव का वर्गीकरण करें।'],
    'help.diffusion': ['Use Run to spread particles from a crowded region.', 'भीड़ वाले क्षेत्र से कण फैलाने के लिए चलाएँ चुनें।'],
    'help.massPercent': ['For a worked mass-percentage example, also enter total solution mass.', 'द्रव्यमान प्रतिशत का उदाहरण देखने के लिए घोल का कुल द्रव्यमान भी भरें।'],
    'help.totalMass': ['Total solution mass must be at least the solute mass.', 'घोल का कुल द्रव्यमान विलेय के द्रव्यमान से कम नहीं होना चाहिए।'],
    'help.placeholderFive': ['e.g. 5', 'जैसे 5'],
    'help.placeholderHundred': ['e.g. 100', 'जैसे 100'],
    'value.glass': ['Glass', 'काँच'],
    'value.wood': ['Wood', 'लकड़ी'],
    'value.rubber': ['Rubber', 'रबर'],
    'value.copper': ['Copper', 'ताँबा'],
    'value.cotton': ['Cotton', 'कपास'],
    'value.plastic': ['Plastic', 'प्लास्टिक'],
    'value.evaporation': ['Evaporation', 'वाष्पीकरण'],
    'value.condensation': ['Condensation', 'संघनन'],
    'value.precipitation': ['Precipitation', 'वर्षण'],
    'value.collection': ['Collection', 'संग्रह'],
    'value.handpicking': ['Handpicking', 'हाथ से चुनना'],
    'value.winnowing': ['Winnowing', 'फटकना'],
    'value.filtration': ['Filtration', 'छानना'],
    'value.air': ['Air', 'वायु'],
    'value.water': ['Water', 'पानी'],
    'value.soil': ['Soil', 'मिट्टी'],
    'value.rocksMinerals': ['Rocks & minerals', 'चट्टानें और खनिज'],
    'value.energyResources': ['Energy resources', 'ऊर्जा संसाधन'],
    'value.sunlight': ['Sunlight', 'सूर्य का प्रकाश'],
    'value.wind': ['Wind', 'हवा'],
    'value.coal': ['Coal', 'कोयला'],
    'value.petroleum': ['Petroleum', 'पेट्रोलियम'],
    'value.naturalGas': ['Natural gas', 'प्राकृतिक गैस'],
    'value.copperMineral': ['Copper mineral', 'ताँबे का खनिज'],
    'value.lemonJuice': ['Lemon juice', 'नींबू का रस'],
    'value.vinegar': ['Vinegar', 'सिरका'],
    'value.soapSolution': ['Soap solution', 'साबुन का घोल'],
    'value.bakingSoda': ['Baking soda solution', 'बेकिंग सोडा का घोल'],
    'value.pureWater': ['Pure water', 'शुद्ध पानी'],
    'value.litmus': ['Litmus', 'लिटमस'],
    'value.universalIndicator': ['Universal indicator', 'सार्वत्रिक सूचक'],
    'value.iron': ['Iron', 'लोहा'],
    'value.aluminium': ['Aluminium', 'एल्युमिनियम'],
    'value.sulfur': ['Sulfur', 'गंधक'],
    'value.graphite': ['Graphite', 'ग्रेफाइट'],
    'value.brass': ['Brass (alloy)', 'पीतल (मिश्रधातु)'],
    'value.rusting': ['Rusting', 'जंग लगना'],
    'value.combustion': ['Combustion (conceptual)', 'दहन (वैचारिक)'],
    'value.meltingIce': ['Melting ice', 'बर्फ का पिघलना'],
    'value.cuttingPaper': ['Cutting paper', 'कागज़ काटना'],
    'value.solid': ['Solid', 'ठोस'],
    'value.liquid': ['Liquid', 'द्रव'],
    'value.gas': ['Gas', 'गैस'],
    'value.salt': ['Salt', 'नमक'],
    'value.sugar': ['Sugar', 'चीनी'],
    'value.foodColouring': ['Food colouring', 'खाद्य रंग'],
    'value.cookingOil': ['Cooking oil', 'खाना पकाने का तेल'],
    'value.saltWater': ['Salt water', 'नमक का पानी'],
    'value.oilWater': ['Oil and water', 'तेल और पानी'],
    'value.element': ['Element', 'तत्व'],
    'value.compound': ['Compound', 'यौगिक'],
    'value.uniformMixture': ['Uniform mixture', 'समांगी मिश्रण'],
    'value.nonUniformMixture': ['Non-uniform mixture', 'विषमांगी मिश्रण'],
    'property.smooth': ['Smooth', 'चिकना'],
    'property.shiny': ['Shiny', 'चमकीला'],
    'property.hard': ['Hard', 'कठोर'],
    'property.transparent': ['Transparent', 'पारदर्शी'],
    'property.insoluble': ['Insoluble', 'अघुलनशील'],
    'property.grainy': ['Grainy', 'दानेदार'],
    'property.dull': ['Dull', 'बिना चमक का'],
    'property.opaque': ['Opaque', 'अपारदर्शी'],
    'property.flexible': ['Flexible', 'लचीला'],
    'property.lustrous': ['Lustrous', 'चमकदार'],
    'property.soft': ['Soft', 'नरम'],
    'property.absorbsWater': ['Absorbs water', 'पानी सोखता है'],
    'property.oftenShiny': ['Often shiny', 'अक्सर चमकीला'],
    'property.variable': ['Variable', 'अलग-अलग'],
    'property.oftenOpaque': ['Often opaque', 'अक्सर अपारदर्शी'],
    'property.usuallyInsoluble': ['Usually insoluble', 'आमतौर पर अघुलनशील'],
    'property.acidic': ['Acidic', 'अम्लीय'],
    'property.basic': ['Basic', 'क्षारीय'],
    'property.neutral': ['Neutral', 'उदासीन'],
    'property.acid': ['Acid', 'अम्ल'],
    'property.electricalConductivity': ['Electrical conductivity', 'विद्युत चालकता'],
    'property.transparency': ['Transparency', 'पारदर्शिता'],
    'property.appearance': ['Appearance', 'रूप'],
    'property.lustre': ['Lustre', 'चमक'],
    'property.hardness': ['Hardness', 'कठोरता'],
    'property.waterTest': ['Water test', 'पानी की जाँच'],
    'property.appearanceColon': ['Appearance:', 'रूप:'],
    'property.lustreColon': ['Lustre:', 'चमक:'],
    'property.hardnessColon': ['Hardness:', 'कठोरता:'],
    'property.transparencyColon': ['Transparency:', 'पारदर्शिता:'],
    'property.waterTestColon': ['Water test:', 'पानी की जाँच:'],
    'property.lustrousLabel': ['Lustre', 'चमक'],
    'property.malleability': ['Malleability', 'आघातवर्धनीयता'],
    'property.ductility': ['Ductility', 'तन्यता'],
    'property.conductivity': ['Conductivity', 'चालकता'],
    'property.use': ['Use', 'उपयोग'],
    'property.canShape': ['Can be shaped', 'आकार दिया जा सकता है'],
    'property.canDrawWire': ['Can be drawn into wire', 'तार में खींचा जा सकता है'],
    'property.goodConductor': ['Good conductor', 'अच्छा चालक'],
    'property.wiring': ['Electrical wiring', 'बिजली के तार'],
    'property.metallicShine': ['Metallic shine', 'धातु जैसी चमक'],
    'property.conductsHeatElectricity': ['Conducts heat and electricity', 'ऊष्मा और बिजली का चालक'],
    'property.tools': ['Tools and structures', 'औज़ार और संरचनाएँ'],
    'property.shinyClean': ['Shiny when clean', 'साफ़ होने पर चमकीला'],
    'property.moderatelyHard': ['Moderately hard', 'मध्यम कठोर'],
    'property.foil': ['Foil and lightweight items', 'पन्नी और हल्की वस्तुएँ'],
    'property.brittle': ['Brittle', 'भंगुर'],
    'property.notMalleable': ['Not malleable', 'आघातवर्धनीय नहीं'],
    'property.notDuctile': ['Not ductile', 'तन्य नहीं'],
    'property.poorConductor': ['Poor conductor', 'कमज़ोर चालक'],
    'property.chemicalIndustry': ['Chemical industry', 'रासायनिक उद्योग'],
    'property.softSlippery': ['Soft and slippery', 'नरम और चिकना'],
    'property.pencilElectrodes': ['Pencil leads and electrodes', 'पेंसिल की नोक और इलेक्ट्रोड'],
    'property.goldenShine': ['Golden shine', 'सुनहरी चमक'],
    'property.harderCopper': ['Harder than copper', 'ताँबे से कठोर'],
    'property.workedForms': ['Can be worked into forms', 'विभिन्न आकारों में ढाला जा सकता है'],
    'property.conductsElectricity': ['Conducts electricity', 'बिजली का चालक'],
    'property.musicalFittings': ['Musical instruments and fittings', 'वाद्ययंत्र और फिटिंग'],
    'art.vs': ['vs', 'बनाम'],
    'art.thermometer': ['Thermometer', 'तापमापी'],
    'art.sandWater': ['sand + water', 'रेत + पानी'],
    'art.grainMixture': ['grain mixture', 'अनाज का मिश्रण'],
    'art.heavierStay': ['Heavier grains stay', 'भारी अनाज रह जाता है'],
    'art.chaffAir': ['→ Chaff carried by air', '→ भूसी हवा से उड़ जाती है'],
    'art.mixture': ['mixture', 'मिश्रण'],
    'art.pickStones': ['Pick visible stones', 'दिखने वाले कंकड़ चुनें'],
    'art.grainsRemain': ['Grains remain', 'अनाज रह जाता है'],
    'art.airFlowAmount': ['Air flow {{airflow}}% · mixture amount {{amount}}%', 'वायु प्रवाह {{airflow}}% · मिश्रण की मात्रा {{amount}}%'],
    'art.mixtureAmount': ['Mixture amount {{amount}}%', 'मिश्रण की मात्रा {{amount}}%'],
    'art.acidic': ['Acidic', 'अम्लीय'],
    'art.neutral': ['Neutral', 'उदासीन'],
    'art.basic': ['Basic', 'क्षारीय'],
    'art.conceptualCombustion': ['Conceptual combustion model', 'दहन का वैचारिक मॉडल'],
    'art.reactants': ['Reactants rearrange to form new substances', 'अभिकारक पुनर्व्यवस्थित होकर नए पदार्थ बनाते हैं'],
    'art.rustForming': ['Rust forming', 'जंग बन रही है'],
    'art.air': ['Air: {{state}}', 'हवा: {{state}}'],
    'art.water': ['Water: {{state}}', 'पानी: {{state}}'],
    'art.present': ['present', 'मौजूद'],
    'art.absent': ['absent', 'अनुपस्थित'],
    'art.modelIllustration': ['Model illustration', 'मॉडल का चित्र'],
    'art.paperStrips': ['Paper strips', 'कागज़ की पट्टियाँ'],
    'art.iceToWater': ['Ice → water', 'बर्फ → पानी'],
    'art.waterVapour': ['Water vapour', 'जलवाष्प'],
    'art.waterVapourLower': ['water vapour', 'जलवाष्प'],
    'art.liquidWater': ['Liquid water', 'तरल पानी'],
    'art.liquidWaterLower': ['liquid water', 'तरल पानी'],
    'art.ice': ['Ice', 'बर्फ'],
    'art.iceLower': ['ice', 'बर्फ'],
    'stage.evaporationLower': ['evaporation', 'वाष्पीकरण'],
    'stage.condensationLower': ['condensation', 'संघनन'],
    'stage.precipitationLower': ['precipitation', 'वर्षण'],
    'stage.collectionLower': ['collection', 'संग्रह'],
    'art.crowded': ['Crowded region', 'भीड़ वाला क्षेत्र'],
    'art.lessCrowded': ['Less crowded region', 'कम भीड़ वाला क्षेत्र'],
    'art.drawnParticles': ['{{count}} drawn particles', '{{count}} दर्शाए गए कण'],
    'art.notToScale': ['Illustration only · not to scale', 'केवल चित्रण · मापानुसार नहीं'],
    'art.specificWater': ['Specific example: water', 'विशिष्ट उदाहरण: पानी'],
    'art.approximateAir': ['Approximate composition · totals about 100%', 'अनुमानित संरचना · कुल लगभग 100%'],
    'art.nitrogen': ['Nitrogen', 'नाइट्रोजन'],
    'art.oxygen': ['Oxygen', 'ऑक्सीजन'],
    'art.vapour': ['Vapour', 'वाष्प'],
    'art.sunlightResource': ['☀ Sunlight', '☀ सूर्य का प्रकाश'],
    'art.windResource': ['〰 Wind', '〰 हवा'],
    'art.coalResource': ['⬟ Coal', '⬟ कोयला'],
    'art.petroleumResource': ['◉ Petroleum', '◉ पेट्रोलियम'],
    'art.argon': ['Argon + other gases', 'आर्गन + अन्य गैसें'],
    'art.topsoil': ['Topsoil', 'ऊपरी मिट्टी'],
    'art.subsoil': ['Subsoil', 'निचली मिट्टी'],
    'art.weatheredRock': ['Weathered rock', 'अपक्षयित चट्टान'],
    'art.bedrock': ['Bedrock', 'आधारशिला'],
    'art.granite': ['Granite', 'ग्रेनाइट'],
    'art.rockMinerals': ['Rock: several minerals', 'चट्टान: कई खनिज'],
    'art.quartz': ['Quartz', 'क्वार्ट्ज'],
    'art.mineral': ['Mineral', 'खनिज'],
    'art.copperOre': ['Copper ore', 'ताँबे का अयस्क'],
    'art.rockContains': ['Rock containing minerals', 'खनिजों वाली चट्टान'],
    'art.renewable': ['Renewable', 'नवीकरणीय'],
    'art.nonRenewable': ['Non-renewable', 'अनवीकरणीय'],
    'art.mixtureVariable': ['Mixtures have variable composition; no fixed formula.', 'मिश्रण की संरचना बदल सकती है; इसका कोई निश्चित सूत्र नहीं होता।'],
    'art.oneParticle': ['One kind of particle is shown.', 'एक प्रकार का कण दिखाया गया है।'],
    'art.spreadSolvent': ['Particles spread through the solvent', 'कण विलायक में फैलते हैं'],
    'art.soluteVisible': ['Solute remains visible in this model', 'इस मॉडल में विलेय दिखाई देता रहता है'],
    'art.qualitativeSolubility': ['Stirring: {{stirring}}% · Temperature: {{temperature}} °C · qualitative model, not measured solubility', 'हिलाना: {{stirring}}% · तापमान: {{temperature}} °C · गुणात्मक मॉडल, मापी गई विलेयता नहीं'],
    'answer.materialIntro': ['{{item}} is {{properties}}. Compared with {{compare}}, notice how their visible properties differ. These are descriptions from simple virtual tests, not numerical scores.', '{{item}} के गुण {{properties}} हैं। इसकी तुलना {{compare}} से करके दिखने वाले गुणों का अंतर देखें। ये सरल आभासी जाँचों के वर्णन हैं, कोई संख्यात्मक अंक नहीं।'],
    'answer.temperature': ['The thermometer measures temperature. At {{c}} °C, the conversion is °F = (9/5 × {{c}}) + 32 = {{f}} °F. The Fahrenheit value is calculated from the Celsius reading; neither number tells the total heat energy.', 'तापमापी तापमान मापता है। {{c}} °C पर रूपांतरण °F = (9/5 × {{c}}) + 32 = {{f}} °F है। फ़ारेनहाइट का मान सेल्सियस से निकाला जाता है; इनमें से कोई भी संख्या कुल ऊष्मा ऊर्जा नहीं बताती।'],
    'answer.water': ['At {{c}} °C the model shows {{state}}. In the {{stage}} stage, water moves through the cycle. Melting and boiling points depend on conditions such as pressure.', '{{c}} °C पर मॉडल {{state}} दिखाता है। {{stage}} चरण में पानी चक्र से होकर गुजरता है। गलनांक और क्वथनांक दाब जैसी परिस्थितियों पर निर्भर करते हैं।'],
    'answer.separation.handpicking': ['Handpicking works when unwanted pieces are large and easy to see and pick out.', 'हाथ से चुनना तब उपयोगी है जब अनचाहे टुकड़े बड़े हों और आसानी से दिखाई देकर चुने जा सकें।'],
    'answer.separation.filtration': ['Filtration traps insoluble solid particles in the filter while liquid passes through its openings.', 'छानने पर अघुलनशील ठोस कण छननी में रुक जाते हैं और द्रव उसके छिद्रों से निकल जाता है।'],
    'answer.separation.winnowing': ['Winnowing uses a difference in mass and how air moves particles. With airflow at {{airflow}}%, lighter chaff is carried farther than heavier grains.', 'फटकने में द्रव्यमान और हवा से कणों की गति के अंतर का उपयोग होता है। {{airflow}}% वायु प्रवाह पर हल्की भूसी भारी अनाज से अधिक दूर जाती है।'],
    'answer.resource.air': ['Air is a mixture of gases: about 78% nitrogen, 21% oxygen, and roughly 1% argon and other gases.', 'वायु गैसों का मिश्रण है: लगभग 78% नाइट्रोजन, 21% ऑक्सीजन और करीब 1% आर्गन तथा अन्य गैसें।'],
    'answer.resource.water': ['Water is found as ice, liquid water, and water vapour. It is continually cycled through the environment.', 'पानी बर्फ, तरल पानी और जलवाष्प के रूप में मिलता है। यह पर्यावरण में लगातार चक्रित होता रहता है।'],
    'answer.resource.soil': ['Soil forms layers, commonly including topsoil, subsoil, weathered parent material, and bedrock.', 'मिट्टी की परतों में सामान्यतः ऊपरी मिट्टी, निचली मिट्टी, अपक्षयित मूल पदार्थ और आधारशिला शामिल होते हैं।'],
    'answer.resource.rocks': ['Rocks are made of one or more minerals. Minerals are naturally occurring substances with characteristic properties.', 'चट्टानें एक या अधिक खनिजों से बनी होती हैं। खनिज प्राकृतिक पदार्थ हैं जिनके विशिष्ट गुण होते हैं।'],
    'answer.resource.energy': ['Sunlight and wind are renewable energy resources; coal, petroleum, and natural gas are non-renewable on human timescales.', 'सूर्य का प्रकाश और हवा नवीकरणीय ऊर्जा संसाधन हैं; मानव समय-मान पर कोयला, पेट्रोलियम और प्राकृतिक गैस अनवीकरणीय हैं।'],
    'answer.resource.classification': ['{{resource}} is classified here as {{class}}.', 'यहाँ {{resource}} को {{class}} संसाधन माना गया है।'],
    'answer.resource.classificationSentence': ['Rocks are made of one or more minerals. Minerals are naturally occurring substances with characteristic properties.', 'चट्टानें एक या अधिक खनिजों से बनी होती हैं। खनिज प्राकृतिक पदार्थ हैं जिनके विशिष्ट गुण होते हैं।'],
    'answer.renewable': ['renewable', 'नवीकरणीय'],
    'answer.nonRenewable': ['non-renewable', 'अनवीकरणीय'],
    'answer.acid': ['{{substance}} behaves as {{class}} in this classroom model. {{indicatorText}}', 'इस कक्षा-मॉडल में {{substance}} {{class}} की तरह व्यवहार करता है। {{indicatorText}}'],
    'answer.blueLitmus': ['Blue litmus turns red.', 'नीला लिटमस लाल हो जाता है।'],
    'answer.redLitmus': ['Red litmus turns blue.', 'लाल लिटमस नीला हो जाता है।'],
    'answer.litmusNoChange': ['Litmus shows no acidic or basic change.', 'लिटमस में अम्लीय या क्षारीय बदलाव नहीं दिखता।'],
    'answer.universalIndicator': ['Universal indicator changes colour across acidic, neutral, and basic conditions. No exact pH is assigned to this generic sample.', 'सार्वत्रिक सूचक अम्लीय, उदासीन और क्षारीय स्थितियों में रंग बदलता है। इस सामान्य नमूने का सटीक pH निर्धारित नहीं किया गया है।'],
    'answer.metal': ['{{material}}: {{properties}}. {{useText}}', '{{material}}: {{properties}}। {{useText}}'],
    'answer.brass': ['Brass is an alloy—a mixture of metals with useful properties, not a single universal formula.', 'पीतल उपयोगी गुणों वाली धातुओं का मिश्रण यानी मिश्रधातु है; इसका कोई एक सार्वत्रिक सूत्र नहीं है।'],
    'answer.metalUse': ['These properties help explain uses such as {{use}}.', 'ये गुण {{use}} जैसे उपयोगों को समझाते हैं।'],
    'answer.rust': ['With both air and water present, iron can rust over time. Rusting forms a new substance; this model shows conditions qualitatively, not a precise rate.', 'हवा और पानी दोनों मौजूद हों तो समय के साथ लोहे में जंग लग सकती है। जंग लगने से नया पदार्थ बनता है; यह मॉडल परिस्थितियों को गुणात्मक रूप से दिखाता है, सटीक दर नहीं।'],
    'answer.rustLimited': ['With {{conditions}}, rusting is greatly limited in this simplified model. No precise reaction rate is implied.', 'इस सरल मॉडल में {{conditions}} होने पर जंग लगना बहुत सीमित होता है। इससे अभिक्रिया की कोई सटीक दर नहीं बताई जाती।'],
    'answer.airWaterAbsent': ['air and water absent', 'हवा और पानी अनुपस्थित'],
    'answer.airAbsent': ['air absent', 'हवा अनुपस्थित'],
    'answer.waterAbsent': ['water absent', 'पानी अनुपस्थित'],
    'answer.combustion': ['Combustion is a chemical change: substances react and new substances form. This is a conceptual model only, not a fire-starting activity.', 'दहन एक रासायनिक बदलाव है: पदार्थ अभिक्रिया करके नए पदार्थ बनाते हैं। यह केवल वैचारिक मॉडल है, आग जलाने की गतिविधि नहीं।'],
    'answer.melting': ['Melting changes water from solid to liquid; it is a physical change, and the substance remains water.', 'पिघलने पर पानी ठोस से द्रव बनता है; यह भौतिक बदलाव है और पदार्थ पानी ही रहता है।'],
    'answer.cutting': ['Cutting changes the paper’s size and shape, but does not make a new substance. It is a physical change.', 'काटने से कागज़ का आकार और रूप बदलता है, पर नया पदार्थ नहीं बनता। यह भौतिक बदलाव है।'],
    'answer.particles': ['{{phase}} particles are {{arrangement}}. Diffusion spreads particles from a crowded region toward a less crowded one. {{count}} of the 14 highlighted particles are shown spreading. Drawings are simplified and not to scale.', '{{phase}} के कण {{arrangement}} होते हैं। विसरण में कण भीड़ वाले क्षेत्र से कम भीड़ वाले क्षेत्र की ओर फैलते हैं। यहाँ 14 में से {{count}} उभारे गए कणों को फैलते दिखाया गया है। चित्र सरल हैं और मापानुसार नहीं हैं।'],
    'answer.solidArrangement': ['close together and vibrate around fixed positions', 'पास-पास होते हैं और निश्चित स्थानों के आसपास कंपन करते हैं'],
    'answer.liquidArrangement': ['close together but can move past one another', 'पास-पास होते हैं, लेकिन एक-दूसरे के ऊपर से जा सकते हैं'],
    'answer.gasArrangement': ['far apart and move freely', 'दूर-दूर होते हैं और स्वतंत्र रूप से चलते हैं'],
    'answer.mixture.element': ['one kind of atom makes an element.', 'एक प्रकार के परमाणु से तत्व बनता है।'],
    'answer.mixture.compound': ['different atoms are chemically joined in a fixed ratio; water is H₂O.', 'अलग-अलग परमाणु निश्चित अनुपात में रासायनिक रूप से जुड़े होते हैं; पानी H₂O है।'],
    'answer.mixture.uniform': ['the different particles are evenly spread in the sample.', 'अलग-अलग कण नमूने में समान रूप से फैले होते हैं।'],
    'answer.mixture.nonUniform': ['the different particles are unevenly spread.', 'अलग-अलग कण असमान रूप से फैले होते हैं।'],
    'answer.mixture.summary': ['{{type}}: {{description}} Mixtures have variable composition and no fixed chemical formula.', '{{type}}: {{description}} मिश्रणों की संरचना बदल सकती है और उनका कोई निश्चित रासायनिक सूत्र नहीं होता।'],
    'answer.solution.invalidMass': ['Enter valid masses: both values must be non-negative, total solution mass must be greater than zero, and it cannot be less than the solute mass.', 'द्रव्यमान सही भरें: दोनों मान ऋणात्मक न हों, घोल का कुल द्रव्यमान शून्य से अधिक हो और विलेय के द्रव्यमान से कम न हो।'],
    'answer.solution.massPercent': ['The solute is {{solute}}; the solvent is {{solvent}}. Mass percentage = (solute mass ÷ solution mass) × 100 = ({{soluteMass}} g ÷ {{solutionMass}} g) × 100 = {{percent}}%. This is a calculated value; mass units cancel.', 'विलेय {{solute}} है और विलायक {{solvent}} है। द्रव्यमान प्रतिशत = (विलेय का द्रव्यमान ÷ घोल का द्रव्यमान) × 100 = ({{soluteMass}} g ÷ {{solutionMass}} g) × 100 = {{percent}}%। यह गणना है; द्रव्यमान की इकाइयाँ कट जाती हैं।'],
    'answer.solution': ['{{solute}} is the solute (the substance being dissolved); {{solvent}} is the solvent; together they form a solution when the solute dissolves. {{dissolving}} A solution is saturated when no more solute can dissolve under the same conditions, so extra solute remains. Stirring and temperature can affect dissolving; no numerical solubility is assumed.', '{{solute}} विलेय है (घुलने वाला पदार्थ); {{solvent}} विलायक है; विलेय घुलने पर दोनों मिलकर घोल बनाते हैं। {{dissolving}} समान परिस्थितियों में और विलेय न घुल सके तो घोल संतृप्त होता है, इसलिए अतिरिक्त विलेय बच जाता है। हिलाने और तापमान से घुलना प्रभावित हो सकता है; कोई संख्यात्मक विलेयता नहीं मानी गई है।'],
    'answer.solution.dissolves': ['The model shows solute particles spreading through the solvent.', 'मॉडल में विलेय के कण विलायक में फैलते दिखते हैं।'],
    'answer.solution.notDissolves': ['This pair does not dissolve well in the qualitative model.', 'इस गुणात्मक मॉडल में यह जोड़ी अच्छी तरह नहीं घुलती।'],
    'observation.materials': ['{{item}} and {{compare}} have different observable properties', '{{item}} और {{compare}} के दिखाई देने वाले गुण अलग हैं'],
    'observation.materials.same': ['Both materials must be identical', 'दोनों सामग्रियाँ एक जैसी ही होनी चाहिए'],
    'observation.materials.formula': ['A material’s appearance gives its chemical formula', 'किसी सामग्री का रूप उसका रासायनिक सूत्र बताता है'],
    'observation.materials.formulaStraight': ["A material's appearance gives its chemical formula", 'किसी सामग्री का रूप उसका रासायनिक सूत्र बताता है'],
    'observation.temperature.correct': ['Fahrenheit rose as Celsius rose', 'सेल्सियस बढ़ने पर फ़ारेनहाइट भी बढ़ा'],
    'observation.temperature.wrong': ['Fahrenheit fell as Celsius rose', 'सेल्सियस बढ़ने पर फ़ारेनहाइट घटा'],
    'observation.temperature.heat': ['A thermometer measured the sample’s total heat', 'तापमापी ने नमूने की कुल ऊष्मा मापी'],
    'observation.temperature.heatStraight': ["A thermometer measured the sample's total heat", 'तापमापी ने नमूने की कुल ऊष्मा मापी'],
    'observation.water.correct': ['Water can change state and cycle through the environment', 'पानी अवस्था बदल सकता है और पर्यावरण में चक्रित होता है'],
    'observation.water.vapour': ['Water vapour is not part of the cycle', 'जलवाष्प इस चक्र का हिस्सा नहीं है'],
    'observation.water.pressure': ['The phase-change temperature never depends on pressure', 'अवस्था बदलने का तापमान दाब पर कभी निर्भर नहीं करता'],
    'observation.separation.correct': ['The method uses a difference between mixture components', 'यह विधि मिश्रण के घटकों के अंतर का उपयोग करती है'],
    'observation.separation.dissolve': ['All methods work by dissolving every solid', 'सभी विधियाँ हर ठोस को घोलकर काम करती हैं'],
    'observation.separation.change': ['The method changes every material into a new substance', 'यह विधि हर सामग्री को नए पदार्थ में बदल देती है'],
    'observation.resources.correct': ['Resources can be classified by how they are replenished', 'संसाधनों का वर्गीकरण इस आधार पर हो सकता है कि वे फिर से कैसे उपलब्ध होते हैं'],
    'observation.resources.renewable': ['Every energy resource is renewable', 'हर ऊर्जा संसाधन नवीकरणीय है'],
    'observation.resources.oxygen': ['Air contains only oxygen', 'वायु में केवल ऑक्सीजन होती है'],
    'observation.acid.correct': ['{{class}} sample gives a characteristic indicator colour', '{{class}} नमूने से सूचक का विशिष्ट रंग मिलता है'],
    'observation.acid.same': ['Indicators always show the same colour', 'सूचक हमेशा एक ही रंग दिखाते हैं'],
    'observation.acid.exactPh': ['A generic substance has an exact pH shown here', 'यहाँ किसी सामान्य पदार्थ का सटीक pH दिखाया गया है'],
    'observation.metals.correct': ['Properties help determine useful applications', 'गुण उपयोगी इस्तेमाल तय करने में मदद करते हैं'],
    'observation.metals.same': ['Every metal has identical properties', 'हर धातु के गुण एक जैसे होते हैं'],
    'observation.metals.alloy': ['An alloy always has one universal formula', 'हर मिश्रधातु का एक सार्वत्रिक सूत्र होता है'],
    'observation.change.rust': ['Air and water allow rusting to occur over time', 'हवा और पानी से समय के साथ जंग लग सकती है'],
    'observation.change.limited': ['Removing a condition limits rusting', 'एक परिस्थिति हटाने से जंग लगना सीमित होता है'],
    'observation.change.model': ['The model helps distinguish whether a new substance forms', 'मॉडल यह पहचानने में मदद करता है कि नया पदार्थ बनता है या नहीं'],
    'observation.change.newSubstance': ['Every change forms a new substance', 'हर बदलाव से नया पदार्थ बनता है'],
    'observation.change.physical': ['A physical change always changes chemical identity', 'भौतिक बदलाव हमेशा रासायनिक पहचान बदलता है'],
    'observation.particles.correct': ['Particles spread from crowded toward less crowded regions', 'कण भीड़ वाले क्षेत्र से कम भीड़ वाले क्षेत्र की ओर फैलते हैं'],
    'observation.particles.still': ['Particles in matter are motionless', 'पदार्थ के कण गतिहीन होते हैं'],
    'observation.particles.scale': ['These drawings are exactly to scale', 'ये चित्र बिल्कुल मापानुसार हैं'],
    'observation.mixture.correct': ['Mixtures can have variable composition', 'मिश्रणों की संरचना बदल सकती है'],
    'observation.mixture.formula': ['A mixture always has one fixed formula', 'मिश्रण का हमेशा एक निश्चित सूत्र होता है'],
    'observation.mixture.oneKind': ['Every sample contains only one kind of particle', 'हर नमूने में केवल एक प्रकार का कण होता है'],
    'observation.solution.correct': ['A solute spreads through a solvent when it dissolves', 'घुलने पर विलेय, विलायक में फैलता है'],
    'observation.solution.solvent': ['The solvent is the substance that gets dissolved', 'विलायक वह पदार्थ है जो घुलता है'],
    'observation.solution.all': ['Every solute dissolves equally in every solvent', 'हर विलेय हर विलायक में समान रूप से घुलता है'],
    'chip.measured': ['Measured', 'मापा गया'],
    'chip.measuredColon': ['Measured:', 'मापा गया:'],
    'chip.calculated': ['Calculated', 'गणना की गई'],
    'chip.calculatedColon': ['Calculated:', 'गणना की गई:'],
    'chip.temperature': ['Temperature', 'तापमान'],
    'chip.temperatureColon': ['Temperature:', 'तापमान:'],
    'chip.currentState': ['Current state', 'वर्तमान अवस्था'],
    'chip.currentStateColon': ['Current state:', 'वर्तमान अवस्था:'],
    'chip.renewable': ['Renewable', 'नवीकरणीय'],
    'chip.renewableColon': ['Renewable:', 'नवीकरणीय:'],
    'chip.nonRenewable': ['Non-renewable', 'अनवीकरणीय'],
    'chip.nonRenewableColon': ['Non-renewable:', 'अनवीकरणीय:'],
    'chip.class': ['Class', 'वर्ग'],
    'chip.classColon': ['Class:', 'वर्ग:'],
    'chip.indicator': ['Indicator', 'सूचक'],
    'chip.indicatorColon': ['Indicator:', 'सूचक:'],
    'chip.newSubstance': ['New substance', 'नया पदार्थ'],
    'chip.newSubstanceColon': ['New substance:', 'नया पदार्थ:'],
    'chip.change': ['Change', 'बदलाव'],
    'chip.changeColon': ['Change:', 'बदलाव:'],
    'chip.chemical': ['Chemical', 'रासायनिक'],
    'chip.physical': ['Physical', 'भौतिक'],
    'chip.state': ['State', 'अवस्था'],
    'chip.stateColon': ['State:', 'अवस्था:'],
    'chip.highlightedSpread': ['Highlighted spread', 'दिखाए गए फैलते कण'],
    'chip.highlightedSpreadColon': ['Highlighted spread:', 'दिखाए गए फैलते कण:'],
    'chip.example': ['Example', 'उदाहरण'],
    'chip.exampleColon': ['Example:', 'उदाहरण:'],
    'chip.model': ['Model', 'मॉडल'],
    'chip.modelColon': ['Model:', 'मॉडल:'],
    'chip.solute': ['Solute', 'विलेय'],
    'chip.soluteColon': ['Solute:', 'विलेय:'],
    'chip.solvent': ['Solvent', 'विलायक'],
    'chip.solventColon': ['Solvent:', 'विलायक:'],
    'chip.massPercentage': ['Mass percentage', 'द्रव्यमान प्रतिशत'],
    'chip.massPercentageColon': ['Mass percentage:', 'द्रव्यमान प्रतिशत:'],
    'chip.method': ['Method', 'विधि'],
    'chip.methodColon': ['Method:', 'विधि:'],
    'chip.materialColon': ['Material:', 'सामग्री:'],
    'chip.useColon': ['Use:', 'उपयोग:'],
    'validity.prediction': ['Choose a prediction before running the simulation.', 'अनुकरण चलाने से पहले एक अनुमान चुनें।'],
    'module.materials.title': ['Materials Around Us', 'हमारे आस-पास की सामग्रियाँ'],
    'module.materials.intro': ['Look closely at everyday materials and compare what we can observe and test. A property helps us describe a material; it is not a made-up score.', 'रोज़मर्रा की सामग्रियों को ध्यान से देखें और उनके दिखाई देने वाले तथा जाँचे जा सकने वाले गुणों की तुलना करें। कोई गुण सामग्री का वर्णन करता है; यह मनगढ़ंत अंक नहीं है।'],
    'module.materials.prediction': ['Which material do you think will let light pass through?', 'आपके विचार में कौन-सी सामग्री प्रकाश को पार जाने देगी?'],
    'module.materials.choice1': ['Glass', 'काँच'],
    'module.materials.choice2': ['Wood', 'लकड़ी'],
    'module.materials.choice3': ['Rubber', 'रबर'],
    'module.temperature.title': ['Temperature and Its Measurement', 'तापमान और उसका मापन'],
    'module.temperature.intro': ['Explore how a thermometer responds as temperature changes. Temperature tells us how hot or cold something is—not how much heat it contains.', 'देखें कि तापमान बदलने पर तापमापी कैसे प्रतिक्रिया देता है। तापमान बताता है कि कोई वस्तु कितनी गर्म या ठंडी है—यह नहीं कि उसमें कितनी ऊष्मा है।'],
    'module.temperature.prediction': ['What happens to the Fahrenheit reading when Celsius rises?', 'सेल्सियस बढ़ने पर फ़ारेनहाइट का मान क्या होता है?'],
    'module.temperature.choice1': ['It rises', 'यह बढ़ता है'],
    'module.temperature.choice2': ['It falls', 'यह घटता है'],
    'module.temperature.choice3': ['It stays the same', 'यह समान रहता है'],
    'module.water.title': ['A Journey Through States of Water', 'पानी की अवस्थाओं की यात्रा'],
    'module.water.intro': ['Follow water through changes of state and the water cycle. The model uses familiar reference points; actual phase-change temperatures can vary with pressure.', 'पानी की अवस्था में बदलाव और जल-चक्र को देखें। मॉडल परिचित संदर्भ बिंदुओं का उपयोग करता है; वास्तविक अवस्था-परिवर्तन तापमान दाब के अनुसार बदल सकते हैं।'],
    'module.water.prediction': ['What is water vapour most likely to do as it cools?', 'ठंडा होने पर जलवाष्प की सबसे अधिक संभावना किसमें बदलने की है?'],
    'module.water.choice1': ['Condense into liquid droplets', 'संघनित होकर तरल बूँदें बनाना'],
    'module.water.choice2': ['Turn into a solid immediately', 'तुरंत ठोस बन जाना'],
    'module.water.choice3': ['Disappear from the water cycle', 'जल-चक्र से गायब हो जाना'],
    'module.separation.title': ['Methods of Separation in Everyday Life', 'रोज़मर्रा के जीवन में पृथक्करण की विधियाँ'],
    'module.separation.intro': ['Choose a method and see how a useful difference between materials helps separate a mixture.', 'एक विधि चुनें और देखें कि सामग्रियों के उपयोगी अंतर से मिश्रण अलग करने में कैसे मदद मिलती है।'],
    'module.separation.prediction': ['Which method is best for removing insoluble solid bits from water?', 'पानी से अघुलनशील ठोस कण हटाने के लिए कौन-सी विधि सबसे अच्छी है?'],
    'module.separation.choice1': ['Filtration', 'छानना'],
    'module.separation.choice2': ['Winnowing', 'फटकना'],
    'module.separation.choice3': ['Handpicking', 'हाथ से चुनना'],
    'module.resources.title': ['Nature’s Treasures', 'प्रकृति के खज़ाने'],
    'module.resources.intro': ['Explore the materials and resources found in nature, from air and water to soil, rocks, minerals, and energy sources.', 'प्रकृति में मिलने वाली सामग्रियों और संसाधनों—वायु, पानी, मिट्टी, चट्टानों, खनिजों और ऊर्जा स्रोतों—का अन्वेषण करें।'],
    'module.resources.prediction': ['Which one is a renewable energy resource?', 'इनमें से कौन-सा नवीकरणीय ऊर्जा संसाधन है?'],
    'module.resources.choice1': ['Sunlight', 'सूर्य का प्रकाश'],
    'module.resources.choice2': ['Coal', 'कोयला'],
    'module.resources.choice3': ['Petroleum', 'पेट्रोलियम'],
    'module.acids.title': ['Exploring Substances: Acids, Bases, and Neutral', 'पदार्थों की खोज: अम्ल, क्षार और उदासीन'],
    'module.acids.intro': ['Indicators give clues about whether a familiar substance is acidic, basic, or neutral. Colour is an observation; exact pH is not assumed for generic samples.', 'सूचक बताते हैं कि कोई परिचित पदार्थ अम्लीय, क्षारीय या उदासीन है। रंग एक अवलोकन है; सामान्य नमूनों के लिए सटीक pH नहीं माना गया है।'],
    'module.acids.prediction': ['What colour does blue litmus turn in an acidic sample?', 'अम्लीय नमूने में नीला लिटमस किस रंग का हो जाता है?'],
    'module.acids.choice1': ['Red', 'लाल'],
    'module.acids.choice2': ['Blue', 'नीला'],
    'module.acids.choice3': ['Green', 'हरा'],
    'module.metals.title': ['The World of Metals and Non-metals', 'धातुओं और अधातुओं की दुनिया'],
    'module.metals.intro': ['Compare material properties and connect them to everyday uses. Real samples can vary, and alloys are mixtures designed for useful properties.', 'सामग्रियों के गुणों की तुलना करें और उन्हें रोज़मर्रा के उपयोगों से जोड़ें। वास्तविक नमूने अलग हो सकते हैं और मिश्रधातुएँ उपयोगी गुणों के लिए बनाए गए मिश्रण हैं।'],
    'module.metals.prediction': ['Which property makes many metals useful for electrical wires?', 'कौन-सा गुण कई धातुओं को बिजली के तारों के लिए उपयोगी बनाता है?'],
    'module.metals.choice1': ['Electrical conductivity', 'विद्युत चालकता'],
    'module.metals.choice2': ['Transparency', 'पारदर्शिता'],
    'module.metals.choice3': ['Solubility', 'विलेयता'],
    'module.changes.title': ['Changes Around Us: Physical and Chemical', 'हमारे आस-पास के बदलाव: भौतिक और रासायनिक'],
    'module.changes.intro': ['A key question is whether a new substance forms. Explore familiar changes, rusting conditions, and combustion as a safe conceptual model.', 'मुख्य प्रश्न यह है कि क्या नया पदार्थ बनता है। परिचित बदलावों, जंग लगने की परिस्थितियों और दहन को सुरक्षित वैचारिक मॉडल के रूप में देखें।'],
    'module.changes.prediction': ['Does rusting form a new substance?', 'क्या जंग लगने से नया पदार्थ बनता है?'],
    'module.changes.choice1': ['Yes', 'हाँ'],
    'module.changes.choice2': ['No, only the shape changes', 'नहीं, केवल आकार बदलता है'],
    'module.changes.choice3': ["It depends only on the object's size", 'यह केवल वस्तु के आकार पर निर्भर करता है'],
    'module.particles.title': ['Particulate Nature of Matter', 'पदार्थ का कणीय स्वरूप'],
    'module.particles.intro': ['Matter is made of tiny particles. Their spacing and motion differ in solids, liquids, and gases; the drawings here are simplified and not to scale.', 'पदार्थ बहुत छोटे कणों से बना है। ठोस, द्रव और गैस में कणों के बीच की दूरी और गति अलग होती है; यहाँ के चित्र सरल हैं और मापानुसार नहीं हैं।'],
    'module.particles.prediction': ['How are particles arranged in a solid?', 'ठोस में कण किस तरह व्यवस्थित होते हैं?'],
    'module.particles.choice1': ['Close together, vibrating in place', 'पास-पास और अपने स्थान पर कंपन करते हुए'],
    'module.particles.choice2': ['Far apart and moving freely', 'दूर-दूर और स्वतंत्र रूप से चलते हुए'],
    'module.particles.choice3': ['Absent from the material', 'सामग्री में मौजूद नहीं'],
    'module.mixtures.title': ['Elements, Compounds, and Mixtures', 'तत्व, यौगिक और मिश्रण'],
    'module.mixtures.intro': ['Particle diagrams help distinguish pure substances from mixtures. A mixture has variable composition and no single fixed chemical formula.', 'कणों के चित्र शुद्ध पदार्थों और मिश्रणों में अंतर समझाते हैं। मिश्रण की संरचना बदल सकती है और उसका कोई एक निश्चित रासायनिक सूत्र नहीं होता।'],
    'module.mixtures.prediction': ['Which description fits a mixture?', 'कौन-सा वर्णन मिश्रण के लिए सही है?'],
    'module.mixtures.choice1': ['Different particles together, with variable composition', 'अलग-अलग कण साथ हों और संरचना बदल सकती हो'],
    'module.mixtures.choice2': ['Only one kind of atom', 'केवल एक प्रकार का परमाणु'],
    'module.mixtures.choice3': ['Atoms chemically joined in one repeating kind of particle', 'परमाणु रासायनिक रूप से जुड़कर एक ही प्रकार का दोहराता कण बनाएँ'],
    'module.solutions.title': ['Solutes, Solvents, and Solutions', 'विलेय, विलायक और घोल'],
    'module.solutions.intro': ['Watch solute particles spread through a solvent. Stirring and temperature can affect dissolving; this qualitative model does not assume specific solubility values.', 'विलेय के कणों को विलायक में फैलते देखें। हिलाने और तापमान से घुलना प्रभावित हो सकता है; यह गुणात्मक मॉडल विलेयता के निश्चित मान नहीं मानता।'],
    'module.solutions.prediction': ['What is the substance that gets dissolved called?', 'घुलने वाले पदार्थ को क्या कहते हैं?'],
    'module.solutions.choice1': ['Solute', 'विलेय'],
    'module.solutions.choice2': ['Solvent', 'विलायक'],
    'module.solutions.choice3': ['Solution', 'घोल'],
  }

  const byEnglish = new Map(Object.entries(entries).map(([key, [en]]) => [en, key]))
  const exact = new Map(Object.entries(entries).map(([key, [en, hi]]) => [en, hi]))
  const propertyHindi = new Map(Object.entries(entries)
    .filter(([key]) => key.startsWith('property.'))
    .map(([, [en, hi]]) => [en.toLowerCase(), hi.toLowerCase()]))

  function translateDynamic(text) {
    let match = text.match(/^Class ([678]) · Curiosity$/)
    if (match) return `कक्षा ${match[1]} · जिज्ञासा`
    match = text.match(/^(\d{2}) · Predict$/)
    if (match) return `${match[1]} · अनुमान`
    match = text.match(/^TOPIC (\d{2}) \/ (\d+)$/)
    if (match) return `विषय ${match[1]} / ${match[2]}`
    match = text.match(/^(\d+) drawn particles$/)
    if (match) return `${match[1]} दर्शाए गए कण`
    match = text.match(/^(\d+) of the 14 highlighted particles are shown spreading\.$/)
    if (match) return `यहाँ 14 में से ${match[1]} उभारे गए कणों को फैलते दिखाया गया है।`
    match = text.match(/^Prediction check: (.+) matches the model’s expected outcome\.$/)
    if (match) return `अनुमान जाँच: ${translateValue(match[1])} मॉडल के अपेक्षित परिणाम से मेल खाता है।`
    match = text.match(/^Prediction check: you chose (.+)\. Compare the model with your prediction and see what you would change next time\.$/)
    if (match) return `अनुमान जाँच: आपने ${translateValue(match[1])} चुना। मॉडल की तुलना अपने अनुमान से करें और सोचें कि अगली बार क्या बदलेंगे।`
    match = text.match(/^Air flow (\d+)% · mixture amount (\d+)%$/)
    if (match) return `वायु प्रवाह ${match[1]}% · मिश्रण की मात्रा ${match[2]}%`
    match = text.match(/^Mixture amount (\d+)%$/)
    if (match) return `मिश्रण की मात्रा ${match[1]}%`
    match = text.match(/^Stirring: (\d+)% · Temperature: (-?\d+(?:\.\d+)?) °C · qualitative model, not measured solubility$/)
    if (match) return `हिलाना: ${match[1]}% · तापमान: ${match[2]} °C · गुणात्मक मॉडल, मापी गई विलेयता नहीं`
    match = text.match(/^Air: (present|absent) · Water: (present|absent)$/)
    if (match) return `हवा: ${translateValue(match[1])} · पानी: ${translateValue(match[2])}`
    match = text.match(/^At (-?\d+(?:\.\d+)?) °C, the conversion is °F = \(9\/5 × (-?\d+(?:\.\d+)?)\) \+ 32 = (-?\d+(?:\.\d+)?) °F\.$/)
    if (match) return `${match[1]} °C पर रूपांतरण °F = (9/5 × ${match[2]}) + 32 = ${match[3]} °F है।`
    match = text.match(/^(.+) and (.+) have different observable properties$/)
    if (match) return `${translateValue(match[1])} और ${translateValue(match[2])} के दिखाई देने वाले गुण अलग हैं`
    match = text.match(/^(.+) sample gives a characteristic indicator colour$/)
    if (match) return `${translateValue(match[1])} नमूने से सूचक का विशिष्ट रंग मिलता है`
    match = text.match(/^(.+) is classified here as (renewable|non-renewable)\.$/)
    if (match) return `यहाँ ${translateValue(match[1])} को ${translateValue(match[2])} संसाधन माना गया है।`
    match = text.match(/^(\d+) °C$/)
    if (match) return `${match[1]} °C`
    match = text.match(/^(\d+(?:\.\d+)?)%$/)
    if (match) return `${match[1]}%`
    match = text.match(/^(.+):$/)
    if (match && exact.has(match[1])) return `${exact.get(match[1])}:`
    match = text.match(/^(Ice|Liquid water|Water vapour) · (-?\d+(?:\.\d+)?) °C$/)
    if (match) return `${translateValue(match[1])} · ${match[2]} °C`
    match = text.match(/^(.+) · (.+)$/)
    if (match && exact.has(match[1]) && exact.has(match[2])) return `${exact.get(match[1])} · ${exact.get(match[2])}`
    match = text.match(/^(.+) is (.+)\. Compared with (.+), notice how their visible properties differ\. These are descriptions from simple virtual tests, not numerical scores\.$/)
    if (match) {
      const material = translateValue(match[1])
      const genitive = material === 'ताँबा' ? 'ताँबे' : material
      const properties = match[2].split(', ').map((property) => propertyHindi.get(property) ?? property).join(', ')
      return `${genitive} के गुण ${properties} हैं। इसकी तुलना ${translateValue(match[3])} से करके दिखने वाले गुणों का अंतर देखें। ये सरल आभासी जाँचों के वर्णन हैं, कोई संख्यात्मक अंक नहीं।`
    }
    match = text.match(/^The thermometer measures temperature\. At (-?\d+(?:\.\d+)?) °C, the conversion is °F = \(9\/5 × (-?\d+(?:\.\d+)?)\) \+ 32 = (-?\d+(?:\.\d+)?) °F\. The Fahrenheit value is calculated from the Celsius reading; neither number tells the total heat energy\.$/)
    if (match) return `तापमापी तापमान मापता है। ${match[1]} °C पर रूपांतरण °F = (9/5 × ${match[2]}) + 32 = ${match[3]} °F है। फ़ारेनहाइट का मान सेल्सियस से निकाला जाता है; इनमें से कोई भी संख्या कुल ऊष्मा ऊर्जा नहीं बताती।`
    match = text.match(/^At (-?\d+(?:\.\d+)?) °C the model shows (ice|water vapour|liquid water)\. In the (evaporation|condensation|precipitation|collection) stage, water moves through the cycle\. Melting and boiling points depend on conditions such as pressure\.$/)
    if (match) return `${match[1]} °C पर मॉडल ${translateValue(match[2])} दिखाता है। ${translateValue(match[3])} चरण में पानी चक्र से होकर गुजरता है। गलनांक और क्वथनांक दाब जैसी परिस्थितियों पर निर्भर करते हैं।`
    if (text === 'Handpicking works when unwanted pieces are large and easy to see and pick out.') return 'हाथ से चुनना तब उपयोगी है जब अनचाहे टुकड़े बड़े हों और आसानी से दिखाई देकर चुने जा सकें।'
    if (text === 'Filtration traps insoluble solid particles in the filter while liquid passes through its openings.') return 'छानने पर अघुलनशील ठोस कण छननी में रुक जाते हैं और द्रव उसके छिद्रों से निकल जाता है।'
    match = text.match(/^Winnowing uses a difference in mass and how air moves particles\. With airflow at (\d+)%, lighter chaff is carried farther than heavier grains\.$/)
    if (match) return `फटकने में द्रव्यमान और हवा से कणों की गति के अंतर का उपयोग होता है। ${match[1]}% वायु प्रवाह पर हल्की भूसी भारी अनाज से अधिक दूर जाती है।`
    match = text.match(/^(.*\.) (.+) is classified here as (renewable|non-renewable)\.$/)
    if (match && exact.has(match[1])) return `${exact.get(match[1])} यहाँ ${translateValue(match[2])} को ${translateValue(match[3])} संसाधन माना गया है।`
    match = text.match(/^(.+) behaves as (acidic|basic|neutral) in this classroom model\. (.+)$/)
    if (match) return `इस कक्षा-मॉडल में ${translateValue(match[1])} ${translateValue(match[2])} की तरह व्यवहार करता है। ${translateValue(match[3])}`
    match = text.match(/^(.+): (.+)\. (.+)\.$/)
    if (match && ['Copper', 'Iron', 'Aluminium', 'Sulfur', 'Graphite', 'Brass (alloy)'].includes(match[1])) {
      const properties = match[2].split('; ').map((item) => {
        const [name, value] = item.split('—')
        return `${translateValue(name)}—${translateValue(value)}`
      }).join('; ')
      return `${translateValue(match[1])}: ${properties}। ${translateValue(match[3])}`
    }
    if (text === 'With both air and water present, iron can rust over time. Rusting forms a new substance; this model shows conditions qualitatively, not a precise rate.') return 'हवा और पानी दोनों मौजूद हों तो समय के साथ लोहे में जंग लग सकती है। जंग लगने से नया पदार्थ बनता है; यह मॉडल परिस्थितियों को गुणात्मक रूप से दिखाता है, सटीक दर नहीं।'
    match = text.match(/^With (air and water absent|air absent|water absent), rusting is greatly limited in this simplified model\. No precise reaction rate is implied\.$/)
    if (match) return `इस सरल मॉडल में ${translateValue(match[1])} होने पर जंग लगना बहुत सीमित होता है। इससे अभिक्रिया की कोई सटीक दर नहीं बताई जाती।`
    if (text === 'Combustion is a chemical change: substances react and new substances form. This is a conceptual model only, not a fire-starting activity.') return 'दहन एक रासायनिक बदलाव है: पदार्थ अभिक्रिया करके नए पदार्थ बनाते हैं। यह केवल वैचारिक मॉडल है, आग जलाने की गतिविधि नहीं।'
    if (text === 'Melting changes water from solid to liquid; it is a physical change, and the substance remains water.') return 'पिघलने पर पानी ठोस से द्रव बनता है; यह भौतिक बदलाव है और पदार्थ पानी ही रहता है।'
    if (text === 'Cutting changes the paper’s size and shape, but does not make a new substance. It is a physical change.' || text === "Cutting changes the paper's size and shape, but does not make a new substance. It is a physical change.") return 'काटने से कागज़ का आकार और रूप बदलता है, पर नया पदार्थ नहीं बनता। यह भौतिक बदलाव है।'
    match = text.match(/^(Solid|Liquid|Gas) particles are (close together and vibrate around fixed positions|close together but can move past one another|far apart and move freely)\. Diffusion spreads particles from a crowded region toward a less crowded one\. (\d+) of the 14 highlighted particles are shown spreading\. Drawings are simplified and not to scale\.$/)
    if (match) return `${translateValue(match[1])} के कण ${translateValue(match[2])} होते हैं। विसरण में कण भीड़ वाले क्षेत्र से कम भीड़ वाले क्षेत्र की ओर फैलते हैं। यहाँ 14 में से ${match[3]} उभारे गए कणों को फैलते दिखाया गया है। चित्र सरल हैं और मापानुसार नहीं हैं।`
    match = text.match(/^(Element|Compound|Uniform mixture|Non-uniform mixture): (one kind of atom makes an element\.|different atoms are chemically joined in a fixed ratio; water is H₂O\.|the different particles are evenly spread in the sample\.|the different particles are unevenly spread\.) Mixtures have variable composition and no fixed chemical formula\.$/)
    if (match) return `${translateValue(match[1])}: ${translateValue(match[2])} मिश्रणों की संरचना बदल सकती है और उनका कोई निश्चित रासायनिक सूत्र नहीं होता।`
    match = text.match(/^The solute is (.+); the solvent is (.+)\. Mass percentage = \(solute mass ÷ solution mass\) × 100 = \((.+) g ÷ (.+) g\) × 100 = ([\d.]+)%\. This is a calculated value; mass units cancel\.$/)
    if (match) return `विलेय ${translateValue(match[1])} है और विलायक ${translateValue(match[2])} है। द्रव्यमान प्रतिशत = (विलेय का द्रव्यमान ÷ घोल का द्रव्यमान) × 100 = (${match[3]} g ÷ ${match[4]} g) × 100 = ${match[5]}%। यह गणना है; द्रव्यमान की इकाइयाँ कट जाती हैं।`
    match = text.match(/^(.+) is the solute \(the substance being dissolved\); (.+) is the solvent; together they form a solution when the solute dissolves\. (The model shows solute particles spreading through the solvent\.|This pair does not dissolve well in the qualitative model\.) A solution is saturated when no more solute can dissolve under the same conditions, so extra solute remains\. Stirring and temperature can affect dissolving; no numerical solubility is assumed\.$/)
    if (match) return `${translateValue(match[1])} विलेय है (घुलने वाला पदार्थ); ${translateValue(match[2])} विलायक है; विलेय घुलने पर दोनों मिलकर घोल बनाते हैं। ${translateValue(match[3])} समान परिस्थितियों में और विलेय न घुल सके तो घोल संतृप्त होता है, इसलिए अतिरिक्त विलेय बच जाता है। हिलाने और तापमान से घुलना प्रभावित हो सकता है; कोई संख्यात्मक विलेयता नहीं मानी गई है।`
    match = text.match(/^(.+) and (.+) have different observable properties$/)
    if (match) return `${translateValue(match[1])} और ${translateValue(match[2])} के दिखाई देने वाले गुण अलग हैं`
    match = text.match(/^(Acidic|Basic|Neutral) sample gives a characteristic indicator colour$/)
    if (match) return `${translateValue(match[1])} नमूने से सूचक का विशिष्ट रंग मिलता है`
    return null
  }

  function translateValue(value) {
    return exact.get(value) ?? value
  }

  function translate(value, language) {
    if (language === 'en') return value
    const text = value.replace(/\u00a0/g, ' ').replace(/\s+/g, ' ').trim()
    const translated = exact.get(text) ?? translateDynamic(text)
    if (translated !== null && translated !== undefined) return translated
    if (!/[A-Za-z]/.test(text)) return value
    if (/^(?:[-−+]?\d[\d.,]*\s*)?(?:°?[CF]|%|g|\/\d+|[+\-−×÷=().,·\s]*)?$/.test(text)) return value
    if (/^(?:H₂O|H2O|[A-Z][A-Za-z0-9₀-₉⁰-⁹+\-]*)$/.test(text)) return value
    return `[[MISSING:${text.slice(0, 100)}]]`
  }

  const bilingualEntries = Object.fromEntries(Object.entries(entries).map(([key, [en, hi]]) => [key, { en, hi }]))
  window.CHEMISTRY_I18N = { version: 1, entries: bilingualEntries, byEnglish, translate }
})()
