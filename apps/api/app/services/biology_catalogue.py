"""Curated Class 6-8 Biology tutor context and local fallback responses."""

BIOLOGY_LESSONS = {
    "bio-plant-world": {
        "grade": 6,
        "title": "The Wonderful World of Plants",
        "facts": [
            "Roots commonly anchor plants and absorb water and minerals.",
            "Stems support plant parts and transport materials; leaves make sugars using light.",
            "Flowers support reproduction; fruits protect seeds; seeds can grow into new plants.",
        ],
        "safety": ["Use only the virtual model; do not collect or eat unknown plants."],
        "fallback": (
            "Roots commonly absorb water and minerals, while leaves make sugars using light.",
            "Trace the plant parts and compare their jobs.",
            "Which plant part is selected in the model?",
        ),
        "fallback_hi": (
            "जड़ें आमतौर पर पानी और खनिज सोखती हैं, जबकि पत्तियाँ प्रकाश की सहायता से शर्करा बनाती हैं।",
            "पौधे के भागों को देखें और उनके काम की तुलना करें।",
            "मॉडल में पौधे का कौन-सा भाग चुना है?",
        ),
    },
    "bio-diversity": {
        "grade": 6,
        "title": "Diversity in the Living World",
        "facts": [
            "Biodiversity is the variety of living things in an area or on Earth.",
            "Organisms can be compared using observable features such as body covering and habitat.",
            "Organisms in one habitat can have different features and needs.",
        ],
        "safety": ["Use the illustrated examples; do not handle wild organisms."],
        "fallback": (
            "Biodiversity is the variety of living things; compare organisms using observable features.",
            "Use the same visible feature for each example.",
            "Which feature or habitat is selected?",
        ),
        "fallback_hi": (
            "जैव विविधता का अर्थ जीवों की विविधता है; दिखाई देने वाले लक्षणों से जीवों की तुलना करें।",
            "हर उदाहरण के लिए एक ही दिखाई देने वाले लक्षण की तुलना करें।",
            "कौन-सा लक्षण या आवास चुना है?",
        ),
    },
    "bio-plant-exploring": {
        "grade": 6,
        "title": "Exploring the World of Plants",
        "facts": [
            "Plant structures vary in shape and size.",
            "Different forms can perform similar roles, such as anchoring or capturing light.",
            "The diagrams show selected examples and are not a complete guide to plant diversity.",
        ],
        "safety": ["Use the virtual examples; do not collect or taste plants."],
        "fallback": (
            "Plant parts can look different while doing similar jobs, such as anchoring or capturing light.",
            "Compare the examples by shape and by the job each part does.",
            "Which plant structure is selected?",
        ),
        "fallback_hi": (
            "पौधों के भाग दिखने में अलग हो सकते हैं, फिर भी समान काम कर सकते हैं।",
            "उदाहरणों की आकृति और उनके काम की तुलना करें।",
            "कौन-सी संरचना चुनी है?",
        ),
    },
    "bio-movement": {
        "grade": 6,
        "title": "Body Systems and Movement",
        "facts": [
            "The skeleton supports the body and protects some organs.",
            "Joints are places where bones meet.",
            "Skeletal muscles contract and pull on bones; muscles do not push bones.",
        ],
        "safety": ["The drawing is an educational model, not medical advice."],
        "fallback": (
            "Joints are where bones meet; skeletal muscles contract and pull on bones to move them.",
            "Find the joint and observe how the muscles change the angle.",
            "Which joint or movement is selected?",
        ),
        "fallback_hi": (
            "जोड़ वह जगह है जहाँ हड्डियाँ मिलती हैं; मांसपेशियाँ सिकुड़कर हड्डियों को खींचती हैं।",
            "जोड़ देखें और ध्यान दें कि मांसपेशियाँ कोण कैसे बदलती हैं।",
            "कौन-सा जोड़ या गति चुनी है?",
        ),
    },
    "bio-classification": {
        "grade": 6,
        "title": "How Scientists Organize Life",
        "facts": [
            "Classification organizes organisms into groups using shared characteristics.",
            "Useful grouping rules are clear and based on observable features or evidence.",
            "Different questions can call for different relevant grouping rules.",
        ],
        "safety": ["The groups are simplified examples, not a complete scientific classification."],
        "fallback": (
            "Classification groups organisms using shared characteristics and evidence.",
            "Choose a feature that can be observed consistently.",
            "Which grouping rule is selected?",
        ),
        "fallback_hi": (
            "वर्गीकरण समान लक्षणों और प्रमाणों के आधार पर जीवों को समूहों में रखता है।",
            "ऐसा लक्षण चुनें जिसे लगातार देखा और तुलना किया जा सके।",
            "कौन-सा वर्गीकरण नियम चुना है?",
        ),
    },
    "bio-characteristics": {
        "grade": 6,
        "title": "Living Creatures: Exploring Their Characteristics",
        "facts": [
            "Living things grow, need nutrition, respire, respond to surroundings, and reproduce.",
            "Cellular respiration releases usable energy from food.",
            "Life-cycle stages differ among organisms.",
        ],
        "safety": ["Examples are educational models, not medical guidance."],
        "fallback": (
            "Living things show processes such as growth, nutrition, respiration, response, and reproduction.",
            "Compare the selected life process with the example organism.",
            "Which process or example is selected?",
        ),
        "fallback_hi": (
            "जीवों में वृद्धि, पोषण, श्वसन, प्रतिक्रिया और प्रजनन जैसी प्रक्रियाएँ होती हैं।",
            "चुनी हुई जीवन-प्रक्रिया की उदाहरण जीव से तुलना करें।",
            "कौन-सी प्रक्रिया या उदाहरण चुना है?",
        ),
    },
    "bio-photosynthesis": {
        "grade": 7,
        "title": "Nutrition in Plants",
        "facts": [
            "Chlorophyll absorbs light energy used in photosynthesis.",
            "Plants use carbon dioxide and water to make glucose and release oxygen.",
            "The diagram is conceptual and does not show every biochemical step.",
        ],
        "safety": ["The model is illustrative; do not eat or handle unknown plants."],
        "fallback": (
            "Photosynthesis uses light energy, water, and carbon dioxide to make glucose and release oxygen.",
            "Follow the input and output arrows around the leaf.",
            "Which input or condition changed?",
        ),
        "fallback_hi": (
            "प्रकाश-संश्लेषण में प्रकाश, पानी और कार्बन डाइऑक्साइड से ग्लूकोज़ बनता है और ऑक्सीजन निकलती है।",
            "पत्ती के पास आने और उससे बाहर जाने वाले तीर देखें।",
            "कौन-सा इनपुट या स्थिति बदली है?",
        ),
    },
    "bio-digestion": {
        "grade": 7,
        "title": "Nutrition in Animals",
        "facts": [
            "Food passes through the mouth, food pipe, stomach, and intestines.",
            "Digestion breaks food into smaller substances the body can absorb.",
            "Most digested nutrients are absorbed in the small intestine.",
        ],
        "safety": ["The diagram is educational and is not medical advice."],
        "fallback": (
            "Food moves from the mouth through the food pipe and stomach; most nutrients are absorbed in the small intestine.",
            "Trace the food path in order.",
            "Which digestive organ is selected?",
        ),
        "fallback_hi": (
            "भोजन मुँह से भोजन-नली और आमाशय होकर जाता है; अधिकतर पोषक तत्व छोटी आँत में सोखे जाते हैं।",
            "भोजन के रास्ते को क्रम से देखें।",
            "पाचन तंत्र का कौन-सा अंग चुना है?",
        ),
    },
    "bio-respiration": {
        "grade": 7,
        "title": "Respiration in Organisms",
        "facts": [
            "Breathing moves air and supports gas exchange; cellular respiration occurs in cells.",
            "Aerobic cellular respiration uses oxygen to release energy from food.",
            "Different organisms exchange gases in different ways.",
        ],
        "safety": ["The diagram is conceptual and is not medical advice."],
        "fallback": (
            "Breathing supports gas exchange; cellular respiration releases usable energy from food inside cells.",
            "Separate air movement from the process happening inside cells.",
            "Which organism or activity is selected?",
        ),
        "fallback_hi": (
            "श्वसन में गैसों का आदान-प्रदान होता है; कोशिकीय श्वसन में कोशिकाएँ भोजन से ऊर्जा छोड़ती हैं।",
            "हवा की आवाजाही और कोशिकाओं के भीतर की प्रक्रिया में अंतर देखें।",
            "कौन-सा जीव या गतिविधि चुनी है?",
        ),
    },
    "bio-transport": {
        "grade": 7,
        "title": "Transportation in Plants and Animals",
        "facts": [
            "The heart pumps blood through vessels around the human body.",
            "Xylem carries water and minerals from roots toward leaves.",
            "Phloem transports sugars to parts of a plant that need or store them.",
        ],
        "safety": ["The diagrams are simplified and not to scale."],
        "fallback": (
            "The heart pumps blood; in plants, xylem carries water and minerals while phloem transports sugars.",
            "Follow the arrows and compare the animal and plant pathways.",
            "Which transport route is selected?",
        ),
        "fallback_hi": (
            "हृदय रक्त पंप करता है; पौधों में जाइलम पानी और खनिज तथा फ्लोएम शर्करा पहुँचाता है।",
            "तीरों को देखें और जीव तथा पौधे के रास्तों की तुलना करें।",
            "कौन-सा परिवहन मार्ग चुना है?",
        ),
    },
    "bio-plant-repro": {
        "grade": 7,
        "title": "Reproduction in Plants",
        "facts": [
            "Pollination is the transfer of pollen to a flower's stigma.",
            "Fertilization joins reproductive cells; ovules develop into seeds.",
            "Seeds can disperse by wind, water, or animals.",
        ],
        "safety": ["The model uses no real flowers, pollen, or organisms."],
        "fallback": (
            "Pollination transfers pollen to a stigma; after fertilization, ovules develop into seeds.",
            "Place the stages in order from pollination to seed dispersal.",
            "Which life-cycle stage is selected?",
        ),
        "fallback_hi": (
            "परागण में परागकण वर्तिकाग्र तक पहुँचते हैं; निषेचन के बाद बीजांड से बीज बनता है।",
            "परागण से बीज-प्रसार तक की अवस्थाओं को क्रम में देखें।",
            "जीवन-चक्र की कौन-सी अवस्था चुनी है?",
        ),
    },
    "bio-forest": {
        "grade": 7,
        "title": "Forests: Our Lifeline",
        "facts": [
            "Plants are producers that use light and resources to grow.",
            "Herbivores, predators, and decomposers have different roles in food webs.",
            "Decomposers break down dead matter and return nutrients to soil.",
        ],
        "safety": ["The food web is a simplified example, not a complete ecosystem."],
        "fallback": (
            "Plants support food webs; decomposers recycle nutrients from dead matter into soil.",
            "Trace how a change to one organism can affect connected organisms.",
            "Which ecosystem change or organism is selected?",
        ),
        "fallback_hi": (
            "पौधे खाद्य-जाल को सहारा देते हैं; अपघटक मृत पदार्थ से पोषक तत्व मिट्टी में लौटाते हैं।",
            "देखें कि एक जीव में बदलाव दूसरे जुड़े जीवों को कैसे प्रभावित कर सकता है।",
            "कौन-सा पारिस्थितिकी बदलाव या जीव चुना है?",
        ),
    },
    "bio-cell": {
        "grade": 8,
        "title": "The Cell",
        "facts": [
            "Cells are the basic units of living organisms.",
            "Typical plant and animal cells have a cell membrane, cytoplasm, and nucleus.",
            "Typical plant cells also have a cell wall; many green plant cells have chloroplasts.",
        ],
        "safety": ["The cell diagrams are illustrative and not to scale."],
        "fallback": (
            "Cells are basic units of life; plant and animal cells share some structures and differ in others.",
            "Compare the selected structure in the plant and animal cell.",
            "Which cell type or structure is selected?",
        ),
        "fallback_hi": (
            "कोशिकाएँ जीवन की मूल इकाइयाँ हैं; पौधों और जंतुओं की कोशिकाओं में कुछ भाग समान और कुछ अलग होते हैं।",
            "पौधे और जंतु कोशिका में चुनी हुई संरचना की तुलना करें।",
            "कौन-सी कोशिका या संरचना चुनी है?",
        ),
    },
    "bio-microbes": {
        "grade": 8,
        "title": "Microorganisms",
        "facts": [
            "Microorganisms include bacteria, fungi, and other tiny forms of life.",
            "Some microorganisms are useful in food production and decomposition; some can cause disease.",
            "Handwashing and safe food handling help reduce the spread of some germs.",
        ],
        "safety": ["Never culture, collect, or handle microorganisms; seek an adult for health concerns."],
        "fallback": (
            "Some microorganisms help make food or recycle matter; some can cause disease.",
            "Compare the helpful and harmful examples without handling any microbes.",
            "Which example role is selected?",
        ),
        "fallback_hi": (
            "कुछ सूक्ष्मजीव भोजन बनाने या पदार्थों के पुनर्चक्रण में मदद करते हैं; कुछ रोग पैदा कर सकते हैं।",
            "सूक्ष्मजीवों को छुए बिना उपयोगी और हानिकारक उदाहरणों की तुलना करें।",
            "कौन-सी भूमिका चुनी है?",
        ),
    },
    "bio-animal-reproduction": {
        "grade": 8,
        "title": "Reproduction in Animals",
        "facts": [
            "Animals reproduce in different ways; some lay eggs and some give birth to live young.",
            "Fertilization may occur inside or outside the body, depending on the animal.",
            "Life-cycle stages vary among species.",
        ],
        "safety": ["The examples are illustrative; do not disturb or handle animals or eggs."],
        "fallback": (
            "Animals have varied reproductive strategies; examples include egg-laying and live birth.",
            "Compare the selected animal's stages without assuming every species is the same.",
            "Which animal or life-cycle stage is selected?",
        ),
        "fallback_hi": (
            "जंतुओं में प्रजनन के तरीके अलग-अलग होते हैं; कुछ अंडे देते हैं और कुछ सीधे बच्चे जनते हैं।",
            "चुने हुए जीव की अवस्थाओं की तुलना करें; सभी प्रजातियाँ एक जैसी नहीं होतीं।",
            "कौन-सा जीव या जीवन-चक्र अवस्था चुनी है?",
        ),
    },
    "bio-adolescence": {
        "grade": 8,
        "title": "Reaching the Age of Adolescence",
        "facts": [
            "Adolescence is a period of physical, emotional, and social change.",
            "Puberty changes happen at different times for different people.",
            "Healthy habits include balanced food, sleep, hygiene, and asking a trusted adult or health professional for concerns.",
        ],
        "safety": ["Do not diagnose students; encourage trusted adult and qualified health-professional support."],
        "fallback": (
            "Adolescence brings changes that happen at different times for different people.",
            "Use the model as general learning; a trusted adult or health professional can help with personal concerns.",
            "Which general development topic is selected?",
        ),
        "fallback_hi": (
            "किशोरावस्था में बदलाव अलग-अलग लोगों में अलग समय पर होते हैं।",
            "यह मॉडल सामान्य जानकारी देता है; निजी चिंता में भरोसेमंद बड़े या स्वास्थ्य विशेषज्ञ से बात करें।",
            "कौन-सा सामान्य विकास विषय चुना है?",
        ),
    },
    "bio-conservation": {
        "grade": 8,
        "title": "Conservation of Plants and Animals",
        "facts": [
            "Biodiversity supports ecosystems and includes many kinds of plants and animals.",
            "Habitat loss and pollution can threaten organisms.",
            "Protected areas, habitat restoration, and responsible resource use can support conservation.",
        ],
        "safety": ["Use the examples to discuss conservation; do not approach or disturb wildlife."],
        "fallback": (
            "Conservation protects organisms and habitats; habitat loss and pollution can threaten biodiversity.",
            "Connect the selected conservation action to the habitat or organisms it supports.",
            "Which threat or conservation action is selected?",
        ),
        "fallback_hi": (
            "संरक्षण जीवों और आवासों की रक्षा करता है; आवास का नाश और प्रदूषण जैव विविधता को खतरा पहुँचा सकते हैं।",
            "चुने हुए संरक्षण कार्य को उस आवास या जीव से जोड़ें जिसे इससे मदद मिलती है।",
            "कौन-सा खतरा या संरक्षण कार्य चुना है?",
        ),
    },
}

BIOLOGY_MODULE_GRADES = {module_id: lesson["grade"] for module_id, lesson in BIOLOGY_LESSONS.items()}
