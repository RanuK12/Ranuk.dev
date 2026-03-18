/* =========================================================
   i18n — Internationalization Module
   Supports: English (en), Spanish (es), Italian (it)
   ========================================================= */

const translations = {
    en: {
        // Navigation
        "nav.about": "About",
        "nav.skills": "Skills",
        "nav.experience": "Experience",
        "nav.projects": "Projects",
        "nav.ranuk": "Ranuk Dev",
        "nav.mllab": "ML Lab",
        "nav.contact": "Contact",

        // Hero
        "hero.greeting": "Hello, World! I'm",
        "hero.description": "Building data-driven solutions with Python, Machine Learning and Cloud technologies. From C\u00f3rdoba to Barcelona, engineering the future one commit at a time.",
        "hero.cta1": "View My Work",
        "hero.cta2": "Let's Talk",
        "hero.stat1": "Years Experience",
        "hero.stat2": "Projects Built",
        "hero.stat3": "Certifications",
        "hero.stat4": "Languages Spoken",
        "hero.scroll": "Scroll Down",

        // Typed subtitles
        "typed": [
            "Systems Engineer",
            "Data Scientist",
            "Python Developer",
            "Machine Learning Engineer",
            "Cloud Solutions Architect"
        ],

        // About
        "about.title": '<span class="title-number">01.</span> About Me',
        "about.p1": "I'm a Systems Engineer and Data Scientist based in Barcelona, Spain, originally from C\u00f3rdoba, Argentina, with Italian roots that run deep. My journey through three countries and cultures has shaped how I approach problem-solving: with the analytical precision of engineering, the creativity of data science, and the human touch of someone who's navigated diverse environments.",
        "about.p2": 'With experience at companies like <strong>Booking.com</strong> and <strong>Accenture</strong>, I\'ve built everything from dynamic pricing ML systems processing 5M+ records to supply chain optimization models that cut costs by 15%. Now through <strong>Ranuk Development</strong>, my own software studio, I build custom digital solutions for clients across Europe and Latin America.',
        "about.p3": 'Beyond code, I\'m a published author\u2014my book <em>"Y as\u00ed voy tejiendo mi camino"</em> reflects the same passion for storytelling that I bring to data visualization and dashboards. Whether it\'s Python, Power BI, or prose, I believe in crafting narratives that drive understanding.',
        "about.degree": "Systems Engineer - UTN, Argentina",
        "about.book": 'Author: "Y as\u00ed voy tejiendo mi camino"',
        "about.langs": "English, Spanish, Italian",
        "about.company": "Founder \u2014 Ranuk Development",

        // Skills
        "skills.title": '<span class="title-number">02.</span> Technical Skills',
        "skills.programming": "Programming",
        "skills.datascience": "Data Science & ML",
        "skills.bi": "BI & Analytics",
        "skills.cloud": "Cloud & DevOps",

        // Experience
        "experience.title": '<span class="title-number">03.</span> Experience',
        "exp.booking1": "Led development of a dynamic pricing optimization system using Python, Scikit-learn, XGBoost, and neural networks for real-time price adjustments.",
        "exp.booking2": "Analyzed 5M+ historical booking records, improving segmentation and promotional campaign effectiveness.",
        "exp.booking3": "Integrated ML models into AWS production environment with scalability and continuous monitoring.",
        "exp.booking4": "Contributed to a 12% improvement in promotional targeting accuracy.",
        "exp.acc_italy_title": "Python Developer — Supply Chain Integration",
        "exp.acc_it1": "Designed and developed Python microservices for supply chain data integration across SAP, Oracle, and legacy ERP systems for a major logistics client.",
        "exp.acc_it2": "Built automated ETL pipelines processing 2M+ daily transactions, reducing data latency from 24h to near real-time.",
        "exp.acc_it3": "Developed REST APIs for inventory synchronization between warehouses, achieving 99.7% data consistency across 50+ locations.",
        "exp.acc_it4": "Implemented monitoring dashboards with Grafana and alerting systems for pipeline health and SLA compliance.",
        "exp.accenture_title": "Data Science Analyst / Sr. Analyst",
        "exp.acc1": "Developed predictive and optimization models for supply chain using Python, SQL, and Power BI.",
        "exp.acc2": "Implemented ML to forecast demand and optimize inventory, achieving 15% cost reduction.",
        "exp.acc3": "Created interactive dashboards in Tableau and Power BI for critical KPIs visualization.",
        "exp.gov_title": "Data Analyst & Power BI Specialist",
        "exp.gov_company": "Government of C\u00f3rdoba",
        "exp.gov1": "Designed and maintained 15+ Power BI dashboards for public works KPI tracking.",
        "exp.gov2": "Performed data cleaning and modeling on 200K+ record datasets, improving accuracy by 30%.",
        "exp.gov3": "Automated certification reporting, reducing manual effort by 40%.",
        "exp.appen_title": "Data Annotation & AI Evaluation",
        "exp.appen1": "Annotated and evaluated data for AI projects, improving NLP model accuracy.",
        "exp.appen2": "Collaborated with global teams to optimize data collection and quality control.",
        "exp.farma_title": "Purchasing & Inventory Analyst",
        "exp.farma1": "Conducted inventory audits and sales analysis with Tableau, reducing losses by 15%.",
        "exp.farma2": "Optimized delivery routes through data analysis, decreasing logistics costs.",
        "exp.farma3": "Developed forecasting reports for purchasing based on historical trends.",

        // Projects
        "projects.title": '<span class="title-number">04.</span> Featured Projects',
        "projects.all": "All",
        "projects.python": "Python",
        "projects.ml": "ML / Data",
        "projects.web": "Web",
        "projects.automation": "Automation",
        "projects.crypto_desc": "Real-time cryptocurrency market analysis system with algorithmic trading strategies, ML-powered predictions, and Telegram bot integration.",
        "projects.job_desc": "AI-powered web platform that matches CVs with job opportunities across multiple platforms using NLP and web scraping.",
        "projects.flight_desc": "Automated flight price monitoring system that tracks deals and sends real-time alerts when prices drop below target thresholds.",
        "projects.garycio_desc": "Full-stack WhatsApp bot system with database integration, automated PDF reports, and incident management for business operations.",
        "projects.movie_title": "Movie Recommender",
        "projects.movie_desc": "Machine learning-based recommendation engine that suggests personalized movie picks using collaborative filtering and content analysis.",
        "projects.sentiment_title": "Review Sentiment Tool",
        "projects.sentiment_desc": "NLP-powered sentiment analysis tool that classifies customer reviews as positive, negative, or neutral with confidence scores.",
        "projects.security_title": "Laptop Security Cam",
        "projects.security_desc": "Python-based security system using computer vision for motion detection and automated alerts when unauthorized access is detected.",
        "projects.eurobrico_title": "Eurobrico Web Redesign",
        "projects.eurobrico_desc": "Complete web audit and redesign prototype for a major Italian retail chain, including UX analysis and commercial proposal.",
        "projects.viewall": "View All Projects on GitHub",

        // Ranuk Development
        "ranuk.title": '<span class="title-number">05.</span> Ranuk Development',
        "ranuk.tagline": "Technology studio building digital products that solve real problems.",
        "ranuk.description": "Ranuk Development is my independent software studio, born from a simple belief: technology should serve people, not the other way around. I build custom web applications, automation systems, and data-driven platforms for clients across Europe and Latin America.",
        "ranuk.val1_title": "Mission",
        "ranuk.val1": "Deliver high-quality, scalable software solutions that empower businesses to grow \u2014 with transparency, speed, and technical excellence.",
        "ranuk.val2_title": "Values",
        "ranuk.val2": "Clean code. Honest communication. Client-first mindset. Every project is a partnership, not a transaction.",
        "ranuk.val3_title": "Approach",
        "ranuk.val3": "From concept to deployment: full-stack development, cloud architecture, automation pipelines, and ongoing support \u2014 all under one roof.",
        "ranuk.clients_title": "Client Projects",
        "ranuk.notarobot_desc": "Full web platform designed and developed from scratch \u2014 interactive experience with modern UI, animations, and responsive design.",
        "ranuk.bahay_desc": "Design studio website for an Italian creative agency \u2014 showcasing their portfolio with elegant layouts and brand-aligned aesthetics.",
        "ranuk.garycio_desc": "End-to-end WhatsApp bot platform with automated reporting, PostgreSQL database, incident management, and PDF generation for business operations.",
        "ranuk.process_title": "How We Work",
        "ranuk.step1_title": "Tell Me Your Idea",
        "ranuk.step1": "Share your project vision — what problem you want to solve, who it's for, and where you want to go. No technical knowledge needed.",
        "ranuk.step2_title": "Custom Proposal",
        "ranuk.step2": "I analyze your needs and send you a clear proposal with scope, timeline, and budget. No surprises, no hidden costs.",
        "ranuk.step3_title": "Build & Launch",
        "ranuk.step3": "Development with constant communication, iterative demos, and a polished product delivered on time. Post-launch support included.",
        "ranuk.cta_title": "Got a project in mind?",
        "ranuk.cta_text": "Tell me your idea and I'll prepare a personalized proposal — no strings attached.",
        "ranuk.cta_btn1": '<i class="fas fa-paper-plane"></i> Request a Quote',
        "ranuk.cta_btn2": '<i class="fas fa-comments"></i> Let\'s Talk',

        // ML Lab
        "mllab.title": '<span class="title-number">06.</span> ML Playground',
        "mllab.subtitle": "Train a neural network right in your browser. Place points of two classes and watch the model learn the decision boundary in real time.",
        "mllab.hint": "Click to place points",
        "mllab.class": "Current Class:",
        "mllab.lr": "Learning Rate:",
        "mllab.epochs": "Epochs:",
        "mllab.neurons": "Hidden Neurons:",
        "mllab.train": "Train Model",
        "mllab.clear": "Clear",
        "mllab.loss": "Loss:",
        "mllab.accuracy": "Accuracy:",
        "mllab.epoch_count": "Epoch:",

        // Certifications
        "certs.title": '<span class="title-number">07.</span> Certifications',

        // Contact
        "contact.title": '<span class="title-number">08.</span> Get In Touch',
        "contact.text": "Whether you have a project in mind, a job opportunity, or just want to say hello, my inbox is always open. I'm currently open to new opportunities and collaborations across Europe and globally.",
        "contact.name": "Name",
        "contact.email": "Email",
        "contact.message": "Message",
        "contact.send": "Send Message",

        // Footer
        "footer.designed": "Designed & Built by",
    },

    es: {
        "nav.about": "Sobre M\u00ed",
        "nav.skills": "Habilidades",
        "nav.experience": "Experiencia",
        "nav.projects": "Proyectos",
        "nav.ranuk": "Ranuk Dev",
        "nav.mllab": "Lab ML",
        "nav.contact": "Contacto",

        "hero.greeting": "\u00a1Hola, Mundo! Soy",
        "hero.description": "Construyendo soluciones basadas en datos con Python, Machine Learning y tecnolog\u00edas Cloud. De C\u00f3rdoba a Barcelona, ingenier\u00eda del futuro un commit a la vez.",
        "hero.cta1": "Ver Mi Trabajo",
        "hero.cta2": "Hablemos",
        "hero.stat1": "A\u00f1os de Experiencia",
        "hero.stat2": "Proyectos Creados",
        "hero.stat3": "Certificaciones",
        "hero.stat4": "Idiomas",
        "hero.scroll": "Desplazar",

        "typed": [
            "Ingeniero de Sistemas",
            "Cient\u00edfico de Datos",
            "Desarrollador Python",
            "Ingeniero de Machine Learning",
            "Arquitecto de Soluciones Cloud"
        ],

        "about.title": '<span class="title-number">01.</span> Sobre M\u00ed',
        "about.p1": "Soy Ingeniero de Sistemas y Cient\u00edfico de Datos radicado en Barcelona, Espa\u00f1a, originario de C\u00f3rdoba, Argentina, con ra\u00edces italianas profundas. Mi recorrido por tres pa\u00edses y culturas ha dado forma a mi manera de resolver problemas: con la precisi\u00f3n anal\u00edtica de la ingenier\u00eda, la creatividad de la ciencia de datos y el toque humano de alguien que ha navegado entornos diversos.",
        "about.p2": 'Con experiencia en empresas como <strong>Booking.com</strong> y <strong>Accenture</strong>, he construido desde sistemas de pricing din\u00e1mico con ML procesando 5M+ registros hasta modelos de optimizaci\u00f3n de cadena de suministro que redujeron costos un 15%. Ahora a trav\u00e9s de <strong>Ranuk Development</strong>, mi propio estudio de software, construyo soluciones digitales personalizadas para clientes en Europa y Am\u00e9rica Latina.',
        "about.p3": 'M\u00e1s all\u00e1 del c\u00f3digo, soy autor publicado\u2014mi libro <em>"Y as\u00ed voy tejiendo mi camino"</em> refleja la misma pasi\u00f3n por contar historias que llevo a la visualizaci\u00f3n de datos y dashboards. Ya sea Python, Power BI o prosa, creo en crear narrativas que impulsen la comprensi\u00f3n.',
        "about.degree": "Ingeniero de Sistemas - UTN, Argentina",
        "about.book": 'Autor: "Y as\u00ed voy tejiendo mi camino"',
        "about.langs": "Ingl\u00e9s, Espa\u00f1ol, Italiano",
        "about.company": "Fundador \u2014 Ranuk Development",

        "skills.title": '<span class="title-number">02.</span> Habilidades T\u00e9cnicas',
        "skills.programming": "Programaci\u00f3n",
        "skills.datascience": "Ciencia de Datos & ML",
        "skills.bi": "BI & An\u00e1lisis",
        "skills.cloud": "Cloud & DevOps",

        "experience.title": '<span class="title-number">03.</span> Experiencia',
        "exp.booking1": "Lider\u00e9 el desarrollo de un sistema de optimizaci\u00f3n de precios din\u00e1micos usando Python, Scikit-learn, XGBoost y redes neuronales para ajustes de precios en tiempo real.",
        "exp.booking2": "Analiz\u00e9 5M+ registros hist\u00f3ricos de reservas, mejorando la segmentaci\u00f3n y efectividad de campa\u00f1as promocionales.",
        "exp.booking3": "Integr\u00e9 modelos de ML en el entorno de producci\u00f3n AWS con escalabilidad y monitoreo continuo.",
        "exp.booking4": "Contribu\u00ed a una mejora del 12% en la precisi\u00f3n del targeting promocional.",
        "exp.acc_italy_title": "Python Developer \u2014 Integraci\u00f3n Supply Chain",
        "exp.acc_it1": "Dise\u00f1\u00e9 y desarroll\u00e9 microservicios en Python para integraci\u00f3n de datos de supply chain entre sistemas SAP, Oracle y ERPs legacy para un importante cliente log\u00edstico.",
        "exp.acc_it2": "Constru\u00ed pipelines ETL automatizados procesando 2M+ transacciones diarias, reduciendo la latencia de datos de 24h a casi tiempo real.",
        "exp.acc_it3": "Desarroll\u00e9 APIs REST para sincronizaci\u00f3n de inventario entre almacenes, logrando 99.7% de consistencia de datos en 50+ ubicaciones.",
        "exp.acc_it4": "Implement\u00e9 dashboards de monitoreo con Grafana y sistemas de alertas para la salud de pipelines y cumplimiento de SLAs.",
        "exp.accenture_title": "Analista de Ciencia de Datos / Sr. Analista",
        "exp.acc1": "Desarroll\u00e9 modelos predictivos y de optimizaci\u00f3n para cadena de suministro usando Python, SQL y Power BI.",
        "exp.acc2": "Implement\u00e9 ML para pronosticar demanda y optimizar inventario, logrando 15% de reducci\u00f3n de costos.",
        "exp.acc3": "Cre\u00e9 dashboards interactivos en Tableau y Power BI para visualizaci\u00f3n de KPIs cr\u00edticos.",
        "exp.gov_title": "Analista de Datos & Especialista Power BI",
        "exp.gov_company": "Gobierno de C\u00f3rdoba",
        "exp.gov1": "Dise\u00f1\u00e9 y mantuve 15+ dashboards de Power BI para seguimiento de KPIs de obras p\u00fablicas.",
        "exp.gov2": "Realic\u00e9 limpieza y modelado de datos en datasets de 200K+ registros, mejorando la precisi\u00f3n un 30%.",
        "exp.gov3": "Automatiz\u00e9 reportes de certificaci\u00f3n, reduciendo el esfuerzo manual un 40%.",
        "exp.appen_title": "Anotaci\u00f3n de Datos & Evaluaci\u00f3n de IA",
        "exp.appen1": "Anot\u00e9 y evalu\u00e9 datos para proyectos de IA, mejorando la precisi\u00f3n de modelos NLP.",
        "exp.appen2": "Colabor\u00e9 con equipos globales para optimizar la recolecci\u00f3n de datos y control de calidad.",
        "exp.farma_title": "Analista de Compras e Inventario",
        "exp.farma1": "Realic\u00e9 auditor\u00edas de inventario y an\u00e1lisis de ventas con Tableau, reduciendo p\u00e9rdidas un 15%.",
        "exp.farma2": "Optimic\u00e9 rutas de entrega mediante an\u00e1lisis de datos, disminuyendo costos log\u00edsticos.",
        "exp.farma3": "Desarroll\u00e9 informes de pron\u00f3stico de compras basados en tendencias hist\u00f3ricas.",

        "projects.title": '<span class="title-number">04.</span> Proyectos Destacados',
        "projects.all": "Todos",
        "projects.python": "Python",
        "projects.ml": "ML / Datos",
        "projects.web": "Web",
        "projects.automation": "Automatizaci\u00f3n",
        "projects.crypto_desc": "Sistema de an\u00e1lisis de criptomonedas en tiempo real con estrategias de trading algor\u00edtmico, predicciones con ML e integraci\u00f3n con bot de Telegram.",
        "projects.job_desc": "Plataforma web con IA que vincula CVs con oportunidades laborales en m\u00faltiples plataformas usando NLP y web scraping.",
        "projects.flight_desc": "Sistema automatizado de monitoreo de precios de vuelos que rastrea ofertas y env\u00eda alertas en tiempo real cuando los precios bajan.",
        "projects.garycio_desc": "Sistema completo de bot de WhatsApp con integraci\u00f3n de base de datos, reportes PDF automatizados y gesti\u00f3n de incidentes.",
        "projects.movie_title": "Recomendador de Pel\u00edculas",
        "projects.movie_desc": "Motor de recomendaciones basado en ML que sugiere pel\u00edculas personalizadas usando filtrado colaborativo y an\u00e1lisis de contenido.",
        "projects.sentiment_title": "Herramienta de Sentimientos",
        "projects.sentiment_desc": "Herramienta de an\u00e1lisis de sentimientos con NLP que clasifica rese\u00f1as de clientes como positivas, negativas o neutras.",
        "projects.security_title": "C\u00e1mara de Seguridad",
        "projects.security_desc": "Sistema de seguridad en Python usando visi\u00f3n por computadora para detecci\u00f3n de movimiento y alertas autom\u00e1ticas.",
        "projects.eurobrico_title": "Redise\u00f1o Web Eurobrico",
        "projects.eurobrico_desc": "Auditor\u00eda web completa y prototipo de redise\u00f1o para una importante cadena retail italiana, con an\u00e1lisis UX y propuesta comercial.",
        "projects.viewall": "Ver Todos los Proyectos en GitHub",

        // Ranuk Development
        "ranuk.title": '<span class="title-number">05.</span> Ranuk Development',
        "ranuk.tagline": "Estudio tecnol\u00f3gico que construye productos digitales que resuelven problemas reales.",
        "ranuk.description": "Ranuk Development es mi estudio independiente de software, nacido de una creencia simple: la tecnolog\u00eda debe servir a las personas, no al rev\u00e9s. Construyo aplicaciones web personalizadas, sistemas de automatizaci\u00f3n y plataformas basadas en datos para clientes en Europa y Am\u00e9rica Latina.",
        "ranuk.val1_title": "Misi\u00f3n",
        "ranuk.val1": "Entregar soluciones de software de alta calidad y escalables que empoderen a las empresas a crecer \u2014 con transparencia, velocidad y excelencia t\u00e9cnica.",
        "ranuk.val2_title": "Valores",
        "ranuk.val2": "C\u00f3digo limpio. Comunicaci\u00f3n honesta. Mentalidad centrada en el cliente. Cada proyecto es una asociaci\u00f3n, no una transacci\u00f3n.",
        "ranuk.val3_title": "Enfoque",
        "ranuk.val3": "Del concepto al despliegue: desarrollo full-stack, arquitectura cloud, pipelines de automatizaci\u00f3n y soporte continuo \u2014 todo bajo un mismo techo.",
        "ranuk.clients_title": "Proyectos de Clientes",
        "ranuk.notarobot_desc": "Plataforma web completa dise\u00f1ada y desarrollada desde cero \u2014 experiencia interactiva con UI moderna, animaciones y dise\u00f1o responsive.",
        "ranuk.bahay_desc": "Sitio web de estudio de dise\u00f1o para una agencia creativa italiana \u2014 mostrando su portfolio con layouts elegantes y est\u00e9tica alineada con la marca.",
        "ranuk.garycio_desc": "Plataforma de bot de WhatsApp de extremo a extremo con reportes automatizados, base de datos PostgreSQL, gesti\u00f3n de incidentes y generaci\u00f3n de PDF.",
        "ranuk.process_title": "C\u00f3mo Trabajamos",
        "ranuk.step1_title": "Contame Tu Idea",
        "ranuk.step1": "Compart\u00ed tu visi\u00f3n del proyecto \u2014 qu\u00e9 problema quer\u00e9s resolver, para qui\u00e9n es y a d\u00f3nde quer\u00e9s llegar. No necesit\u00e1s conocimientos t\u00e9cnicos.",
        "ranuk.step2_title": "Propuesta Personalizada",
        "ranuk.step2": "Analizo tus necesidades y te env\u00edo una propuesta clara con alcance, tiempos y presupuesto. Sin sorpresas, sin costos ocultos.",
        "ranuk.step3_title": "Desarrollo & Lanzamiento",
        "ranuk.step3": "Desarrollo con comunicaci\u00f3n constante, demos iterativas y un producto pulido entregado a tiempo. Soporte post-lanzamiento incluido.",
        "ranuk.cta_title": "\u00bfTen\u00e9s un proyecto en mente?",
        "ranuk.cta_text": "Contame tu idea y te preparo una propuesta personalizada \u2014 sin compromiso.",
        "ranuk.cta_btn1": '<i class="fas fa-paper-plane"></i> Solicitar Presupuesto',
        "ranuk.cta_btn2": '<i class="fas fa-comments"></i> Hablemos',

        "mllab.title": '<span class="title-number">06.</span> Laboratorio ML',
        "mllab.subtitle": "Entrena una red neuronal directamente en tu navegador. Coloca puntos de dos clases y observa c\u00f3mo el modelo aprende la frontera de decisi\u00f3n en tiempo real.",
        "mllab.hint": "Haz clic para colocar puntos",
        "mllab.class": "Clase Actual:",
        "mllab.lr": "Tasa de Aprendizaje:",
        "mllab.epochs": "\u00c9pocas:",
        "mllab.neurons": "Neuronas Ocultas:",
        "mllab.train": "Entrenar Modelo",
        "mllab.clear": "Limpiar",
        "mllab.loss": "P\u00e9rdida:",
        "mllab.accuracy": "Precisi\u00f3n:",
        "mllab.epoch_count": "\u00c9poca:",

        "certs.title": '<span class="title-number">07.</span> Certificaciones',

        "contact.title": '<span class="title-number">08.</span> Contacto',
        "contact.text": "Ya sea que tengas un proyecto en mente, una oportunidad laboral o simplemente quieras saludar, mi bandeja de entrada siempre est\u00e1 abierta. Actualmente estoy abierto a nuevas oportunidades y colaboraciones en Europa y a nivel global.",
        "contact.name": "Nombre",
        "contact.email": "Correo Electr\u00f3nico",
        "contact.message": "Mensaje",
        "contact.send": "Enviar Mensaje",

        "footer.designed": "Dise\u00f1ado y Construido por",
    },

    it: {
        "nav.about": "Chi Sono",
        "nav.skills": "Competenze",
        "nav.experience": "Esperienza",
        "nav.projects": "Progetti",
        "nav.ranuk": "Ranuk Dev",
        "nav.mllab": "Lab ML",
        "nav.contact": "Contatto",

        "hero.greeting": "Ciao, Mondo! Sono",
        "hero.description": "Costruisco soluzioni data-driven con Python, Machine Learning e tecnologie Cloud. Da C\u00f3rdoba a Barcellona, ingegnerizzando il futuro un commit alla volta.",
        "hero.cta1": "Vedi i Miei Lavori",
        "hero.cta2": "Parliamone",
        "hero.stat1": "Anni di Esperienza",
        "hero.stat2": "Progetti Realizzati",
        "hero.stat3": "Certificazioni",
        "hero.stat4": "Lingue Parlate",
        "hero.scroll": "Scorri Gi\u00f9",

        "typed": [
            "Ingegnere dei Sistemi",
            "Data Scientist",
            "Sviluppatore Python",
            "Ingegnere Machine Learning",
            "Architetto Soluzioni Cloud"
        ],

        "about.title": '<span class="title-number">01.</span> Chi Sono',
        "about.p1": "Sono un Ingegnere dei Sistemi e Data Scientist con sede a Barcellona, Spagna, originario di C\u00f3rdoba, Argentina, con radici italiane profonde. Il mio percorso attraverso tre paesi e culture ha plasmato il mio approccio alla risoluzione dei problemi: con la precisione analitica dell'ingegneria, la creativit\u00e0 della data science e il tocco umano di chi ha navigato ambienti diversi.",
        "about.p2": 'Con esperienza in aziende come <strong>Booking.com</strong> e <strong>Accenture</strong>, ho costruito di tutto: dai sistemi di pricing dinamico con ML che elaborano 5M+ record ai modelli di ottimizzazione della supply chain che hanno ridotto i costi del 15%. Ora attraverso <strong>Ranuk Development</strong>, il mio studio software, costruisco soluzioni digitali personalizzate per clienti in Europa e America Latina.',
        "about.p3": 'Oltre al codice, sono un autore pubblicato\u2014il mio libro <em>"Y as\u00ed voy tejiendo mi camino"</em> riflette la stessa passione per la narrazione che porto nella visualizzazione dei dati e nei dashboard. Che sia Python, Power BI o prosa, credo nel creare narrazioni che guidano la comprensione.',
        "about.degree": "Ingegnere dei Sistemi - UTN, Argentina",
        "about.book": 'Autore: "Y as\u00ed voy tejiendo mi camino"',
        "about.langs": "Inglese, Spagnolo, Italiano",
        "about.company": "Fondatore \u2014 Ranuk Development",

        "skills.title": '<span class="title-number">02.</span> Competenze Tecniche',
        "skills.programming": "Programmazione",
        "skills.datascience": "Data Science & ML",
        "skills.bi": "BI & Analisi",
        "skills.cloud": "Cloud & DevOps",

        "experience.title": '<span class="title-number">03.</span> Esperienza',
        "exp.booking1": "Ho guidato lo sviluppo di un sistema di ottimizzazione dei prezzi dinamici usando Python, Scikit-learn, XGBoost e reti neurali per aggiustamenti in tempo reale.",
        "exp.booking2": "Analizzato 5M+ record storici di prenotazioni, migliorando la segmentazione e l'efficacia delle campagne promozionali.",
        "exp.booking3": "Integrato modelli ML nell'ambiente di produzione AWS con scalabilit\u00e0 e monitoraggio continuo.",
        "exp.booking4": "Contribuito a un miglioramento del 12% nella precisione del targeting promozionale.",
        "exp.acc_italy_title": "Python Developer \u2014 Integrazione Supply Chain",
        "exp.acc_it1": "Progettato e sviluppato microservizi Python per l'integrazione dei dati della supply chain tra sistemi SAP, Oracle ed ERP legacy per un importante cliente logistico.",
        "exp.acc_it2": "Costruito pipeline ETL automatizzate che elaborano 2M+ transazioni giornaliere, riducendo la latenza dei dati da 24h a quasi tempo reale.",
        "exp.acc_it3": "Sviluppato API REST per la sincronizzazione dell'inventario tra magazzini, raggiungendo il 99.7% di consistenza dati su 50+ sedi.",
        "exp.acc_it4": "Implementato dashboard di monitoraggio con Grafana e sistemi di alerting per lo stato delle pipeline e la conformit\u00e0 agli SLA.",
        "exp.accenture_title": "Analista Data Science / Sr. Analista",
        "exp.acc1": "Sviluppato modelli predittivi e di ottimizzazione per la supply chain usando Python, SQL e Power BI.",
        "exp.acc2": "Implementato ML per prevedere la domanda e ottimizzare l'inventario, ottenendo una riduzione dei costi del 15%.",
        "exp.acc3": "Creato dashboard interattivi in Tableau e Power BI per la visualizzazione di KPI critici.",
        "exp.gov_title": "Analista Dati & Specialista Power BI",
        "exp.gov_company": "Governo di C\u00f3rdoba",
        "exp.gov1": "Progettato e mantenuto 15+ dashboard Power BI per il monitoraggio dei KPI delle opere pubbliche.",
        "exp.gov2": "Eseguito pulizia e modellazione dati su dataset di 200K+ record, migliorando la precisione del 30%.",
        "exp.gov3": "Automatizzato i report di certificazione, riducendo lo sforzo manuale del 40%.",
        "exp.appen_title": "Annotazione Dati & Valutazione IA",
        "exp.appen1": "Annotato e valutato dati per progetti di IA, migliorando la precisione dei modelli NLP.",
        "exp.appen2": "Collaborato con team globali per ottimizzare la raccolta dati e il controllo qualit\u00e0.",
        "exp.farma_title": "Analista Acquisti e Inventario",
        "exp.farma1": "Condotto audit dell'inventario e analisi delle vendite con Tableau, riducendo le perdite del 15%.",
        "exp.farma2": "Ottimizzato i percorsi di consegna tramite analisi dei dati, diminuendo i costi logistici.",
        "exp.farma3": "Sviluppato report previsionali per gli acquisti basati su trend storici.",

        "projects.title": '<span class="title-number">04.</span> Progetti in Evidenza',
        "projects.all": "Tutti",
        "projects.python": "Python",
        "projects.ml": "ML / Dati",
        "projects.web": "Web",
        "projects.automation": "Automazione",
        "projects.crypto_desc": "Sistema di analisi crypto in tempo reale con strategie di trading algoritmico, predizioni ML e integrazione bot Telegram.",
        "projects.job_desc": "Piattaforma web con IA che abbina CV ad opportunit\u00e0 lavorative su pi\u00f9 piattaforme usando NLP e web scraping.",
        "projects.flight_desc": "Sistema automatizzato di monitoraggio prezzi voli che traccia offerte e invia alert in tempo reale quando i prezzi scendono.",
        "projects.garycio_desc": "Sistema completo di bot WhatsApp con integrazione database, report PDF automatizzati e gestione incidenti.",
        "projects.movie_title": "Raccomandatore Film",
        "projects.movie_desc": "Motore di raccomandazioni basato su ML che suggerisce film personalizzati usando filtraggio collaborativo e analisi del contenuto.",
        "projects.sentiment_title": "Analisi Sentimenti",
        "projects.sentiment_desc": "Strumento di analisi del sentimento con NLP che classifica le recensioni dei clienti come positive, negative o neutre.",
        "projects.security_title": "Telecamera di Sicurezza",
        "projects.security_desc": "Sistema di sicurezza in Python che usa computer vision per il rilevamento del movimento e alert automatici.",
        "projects.eurobrico_title": "Redesign Web Eurobrico",
        "projects.eurobrico_desc": "Audit web completo e prototipo di redesign per un'importante catena retail italiana, con analisi UX e proposta commerciale.",
        "projects.viewall": "Vedi Tutti i Progetti su GitHub",

        // Ranuk Development
        "ranuk.title": '<span class="title-number">05.</span> Ranuk Development',
        "ranuk.tagline": "Studio tecnologico che costruisce prodotti digitali che risolvono problemi reali.",
        "ranuk.description": "Ranuk Development \u00e8 il mio studio software indipendente, nato da una convinzione semplice: la tecnologia deve servire le persone, non il contrario. Costruisco applicazioni web personalizzate, sistemi di automazione e piattaforme data-driven per clienti in Europa e America Latina.",
        "ranuk.val1_title": "Missione",
        "ranuk.val1": "Fornire soluzioni software di alta qualit\u00e0 e scalabili che permettano alle aziende di crescere \u2014 con trasparenza, velocit\u00e0 ed eccellenza tecnica.",
        "ranuk.val2_title": "Valori",
        "ranuk.val2": "Codice pulito. Comunicazione onesta. Mentalit\u00e0 orientata al cliente. Ogni progetto \u00e8 una partnership, non una transazione.",
        "ranuk.val3_title": "Approccio",
        "ranuk.val3": "Dal concetto al deployment: sviluppo full-stack, architettura cloud, pipeline di automazione e supporto continuo \u2014 tutto sotto un unico tetto.",
        "ranuk.clients_title": "Progetti per Clienti",
        "ranuk.notarobot_desc": "Piattaforma web completa progettata e sviluppata da zero \u2014 esperienza interattiva con UI moderna, animazioni e design responsive.",
        "ranuk.bahay_desc": "Sito web di studio di design per un'agenzia creativa italiana \u2014 mostrando il loro portfolio con layout eleganti ed estetica allineata al brand.",
        "ranuk.garycio_desc": "Piattaforma bot WhatsApp end-to-end con reportistica automatizzata, database PostgreSQL, gestione incidenti e generazione PDF.",
        "ranuk.process_title": "Come Lavoriamo",
        "ranuk.step1_title": "Raccontami la Tua Idea",
        "ranuk.step1": "Condividi la tua visione del progetto \u2014 quale problema vuoi risolvere, per chi \u00e8 e dove vuoi arrivare. Non servono competenze tecniche.",
        "ranuk.step2_title": "Proposta Personalizzata",
        "ranuk.step2": "Analizzo le tue esigenze e ti invio una proposta chiara con ambito, tempi e budget. Nessuna sorpresa, nessun costo nascosto.",
        "ranuk.step3_title": "Sviluppo & Lancio",
        "ranuk.step3": "Sviluppo con comunicazione costante, demo iterative e un prodotto rifinito consegnato in tempo. Supporto post-lancio incluso.",
        "ranuk.cta_title": "Hai un progetto in mente?",
        "ranuk.cta_text": "Raccontami la tua idea e ti preparer\u00f2 una proposta personalizzata \u2014 senza impegno.",
        "ranuk.cta_btn1": '<i class="fas fa-paper-plane"></i> Richiedi un Preventivo',
        "ranuk.cta_btn2": '<i class="fas fa-comments"></i> Parliamone',

        "mllab.title": '<span class="title-number">06.</span> Laboratorio ML',
        "mllab.subtitle": "Allena una rete neurale direttamente nel tuo browser. Posiziona punti di due classi e osserva il modello imparare il confine decisionale in tempo reale.",
        "mllab.hint": "Clicca per posizionare punti",
        "mllab.class": "Classe Attuale:",
        "mllab.lr": "Tasso di Apprendimento:",
        "mllab.epochs": "Epoche:",
        "mllab.neurons": "Neuroni Nascosti:",
        "mllab.train": "Allena Modello",
        "mllab.clear": "Pulisci",
        "mllab.loss": "Perdita:",
        "mllab.accuracy": "Precisione:",
        "mllab.epoch_count": "Epoca:",

        "certs.title": '<span class="title-number">07.</span> Certificazioni',

        "contact.title": '<span class="title-number">08.</span> Contattami',
        "contact.text": "Che tu abbia un progetto in mente, un'opportunit\u00e0 lavorativa o semplicemente voglia salutare, la mia casella di posta \u00e8 sempre aperta. Attualmente sono aperto a nuove opportunit\u00e0 e collaborazioni in Europa e a livello globale.",
        "contact.name": "Nome",
        "contact.email": "Email",
        "contact.message": "Messaggio",
        "contact.send": "Invia Messaggio",

        "footer.designed": "Progettato e Costruito da",
    }
};

class I18n {
    constructor() {
        this.currentLang = localStorage.getItem('ranuk-lang') || 'en';
        this.listeners = [];
    }

    init() {
        // Sync button active states with stored language
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === this.currentLang);
        });
        document.documentElement.lang = this.currentLang;
        this.applyTranslations();
        this.setupButtons();
    }

    setupButtons() {
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const lang = btn.dataset.lang;
                if (lang === this.currentLang) return;
                this.setLanguage(lang);
            });
        });
    }

    setLanguage(lang) {
        this.currentLang = lang;
        localStorage.setItem('ranuk-lang', lang);

        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });

        document.documentElement.lang = lang;
        this.applyTranslations();
        this.listeners.forEach(fn => fn(lang));
    }

    applyTranslations() {
        const t = translations[this.currentLang];
        if (!t) return;

        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.dataset.i18n;
            if (t[key] !== undefined) {
                el.innerHTML = t[key];
            }
        });
    }

    get(key) {
        const t = translations[this.currentLang];
        return t ? t[key] : translations.en[key];
    }

    getTypedStrings() {
        return this.get('typed') || translations.en.typed;
    }

    onChange(fn) {
        this.listeners.push(fn);
    }
}

window.i18n = new I18n();
