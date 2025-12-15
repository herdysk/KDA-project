<!DOCTYPE html>
<html lang="fr" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kadea Academy - Formez-vous aux métiers du futur</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: { kadea: { dark: '#1a1a1a', gray: '#f4f4f5' } },
                    fontFamily: { sans: ['Inter', 'sans-serif'], serif: ['Playfair Display', 'serif'] }
                }
            }
        }
    </script>
    <style>
        .gradient-blob {
            position: absolute; width: 500px; height: 500px;
            background: radial-gradient(circle, rgba(134,239,172,0.4) 0%, rgba(253,224,71,0.3) 50%, rgba(255,255,255,0) 70%);
            filter: blur(40px); z-index: -1; pointer-events: none;
            top: 50%; left: 50%; transform: translate(-50%, -50%);
        }
        .reveal { opacity: 0; transform: translateY(30px); transition: all 0.8s ease-out; }
        .reveal.active { opacity: 1; transform: translateY(0); }
    </style>
</head>
<body class="font-sans text-gray-800 bg-[#F9FAFB]">
    <nav class="absolute w-full z-50 top-0 left-0 p-6 md:p-10">
        <div class="container mx-auto flex justify-between items-center">
            <a href="#" class="text-2xl font-bold text-gray-900 font-sans tracking-tight">Kadea<span class="text-gray-500">Academy</span></a>
            <div class="hidden md:flex space-x-8 items-center font-medium text-sm text-gray-600">
                <a href="#formations" class="hover:text-gray-900 transition">Formations</a>
                <a href="#avantages" class="hover:text-gray-900 transition">Avantages</a>
                <a href="#" class="hover:text-gray-900 transition">Contact</a>
            </div>
        </div>
    </nav>

    <header class="relative min-h-screen flex flex-col md:flex-row overflow-hidden bg-[#F9FAFB]">
        <div class="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12 relative z-10 pt-32 md:pt-0">
            <div class="gradient-blob top-[40%] left-[40%]"></div>
            <div class="max-w-lg w-full reveal active">
                <div class="flex items-center gap-2 text-sm font-medium text-gray-600 mb-6">
                    <i class="fa-solid fa-sun text-yellow-500"></i><span>Rentrée : Janvier 2025</span>
                </div>
                <h1 class="text-5xl md:text-7xl text-gray-900 leading-tight mb-6 font-serif">Qu'aimeriez-vous <br><span class="font-bold italic">apprendre ?</span></h1>
                <p class="text-gray-600 text-lg leading-relaxed mb-10 max-w-md">Développez vos compétences avec nos cursus intensifs. Code, Data ou Marketing : choisissez votre voie.</p>
                <a href="#" class="inline-block bg-[#333333] hover:bg-black text-white px-8 py-4 rounded text-sm font-medium transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">Commencer l'aventure</a>
            </div>
        </div>
        <div class="w-full md:w-1/2 h-[50vh] md:h-screen relative reveal active delay-200">
            <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=90" alt="Étudiante Kadea" class="absolute inset-0 w-full h-full object-cover object-center md:object-left-top">
        </div>
    </header>

    <!-- Widget JS Kadea -->
    <script src="kdawidget.js"></script>
    <script>
        // Simple animation trigger
        window.addEventListener('load', () => {
            document.querySelectorAll('.reveal').forEach(el => el.classList.add('active'));
        });
    </script>
</body>
</html>