---
title: Voilà pourquoi OpenClaw ne sert à rien
date: 2026-03-25
category: informatique
tags:
  - OpenClaw
  - agent IA
  - Claude
  - Discord bot
  - marketing IA
  - SearxNG
  - automatisation
  - TypeScript
  - Veo 3.1
  - retour d'expérience
  - sécurité IA
  - solo entrepreneur
  - dev indépendant
description: "Retour d'expérience sur OpenClaw : tokens, boutons Discord cassés,
  failles de sécurité. Pourquoi j'ai viré le framework et codé mon propre bot
  avec Claude."
thumbnail: /images/blog/openclaw2026.jpg
draft: true
---
Je suis développeur full-stack. Pas marketeur. En mars 2026, j'ai voulu tester les agents IA dont tout le monde parle "OpenClaw". Pas juste jouer avec un prompt vraiment mettre les mains dans un système agentique, voir ce que ça donne en conditions réelles. J'ai un side project, une app qui s'appelle Tumulte. C'était l'occasion parfaite : apprendre le marketing en laissant une IA le faire à ma place, et au passage comprendre où en vont vraiment ces technologies en 2026.

J'ai entendu parler d'OpenClaw. Un framework open source pour faire tourner des agents IA autonomes sur tes plateformes de messagerie. Discord, Telegram, WhatsApp. L'agent a de la mémoire, des compétences configurables, des cron jobs. Je me suis dit : c'est le bon moment pour tester ça.

## Ça démarre vite, les doutes aussi

L'installation en elle-même se fait dans la journée. VPS, bot Discord, gateway, les premiers skills configurés. L'agent répond, les cron jobs tournent. Jusque-là, pas de souci.

C'est en regardant comment ça fonctionne de plus près que les questions commencent. Tout repose sur des fichiers Markdown les "skills" que l'agent lit avant de répondre. Tu décris le comportement attendu en langage naturel, et l'agent interprète. C'est du prompting, ni plus ni moins. Et quand tu es développeur et que tu utilises l'IA au quotidien, tu sais une chose : même prompt, même modèle, les résultats ne sont jamais identiques. Jamais !

Ça veut dire que ton agent ne se comportera pas exactement pareil d'un run à l'autre. Des petites hallucinations, des dérives légères dans le ton, un mot interdit qui passe, une suggestion qui ressemble à un pitch au lieu d'une anecdote. Rien de dramatique, mais rien de robuste non plus. Je suis habitué à des systèmes déterministes, incrémentaux, testables, mais là ça gratte !

Je sentais déjà qu'on allait toucher une limite assez vite. Mais naïvement, j'ai continué à implémenter le truc pour pouvoir tester OpenClaw de manière plus approfondie, en complète « immersion ».

## Les tokens fondent, et tu ne sais pas pourquoi

Première vraie claque : les coûts. À chaque cron job, OpenClaw charge tout le contexte dans le prompt envoyé au LLM. Les skills, la mémoire de session, les instructions système du framework, etc. Mon SKILL.md faisait 800 lignes tout le pipeline de décision du Chroniqueur y était décrit. À chaque exécution, l'agent consommait entre 20 000 et 30 000 tokens en base je n'ai pas compté l'utilisation des données passées pour enrichir et affiner la réponse. Cinq cron jobs par jour, fais le calcul.

Et tu ne maîtrises pas ce qui est injecté dans le prompt. OpenClaw ajoute son propre contexte système, les infos de session, les métadonnées du channel Discord. Tu vois le résultat, tu vois la facture, mais la boîte noire entre les deux reste opaque. En tant que développeur, quand tu ne peux pas inspecter ce qui se passe entre ton input et ton output, ça me met mal à l'aise.

J'ai essayé de mettre en place un channel Discord dédié aux logs, pour avoir chaque jour un récapitulatif de tout ce que l'agent avait fait : les veilles effectuées, les idées générées, les publications, les erreurs. L'idée c'était d'avoir de la visibilité sur la machine. Sauf que les logs étaient inconstants. Certains jours ils arrivaient formatés correctement, d'autres jours c'était un bloc de texte vague sans structure. Et certains jours, rien du tout. Pas d'erreur, pas de log, juste le silence. Impossible de savoir si l'agent avait tourné ou pas sans aller fouiller les fichiers sur le VPS (c'est chiant).

## Les boutons Discord : là où tout s'effondre

Mon workflow reposait sur un principe simple. L'agent propose des suggestions de contenu dans un channel Discord. Moi je clique sur un bouton pour valider, modifier ou rejeter chaque suggestion. Go, Modifier, Skip, Plus tard. Quatre boutons, un par suggestion. C'est comme ça que l'agent devait apprendre avec le temps en observant mes choix, en notant ce que je skip, en affinant ce qu'il propose.

Discord permet ça nativement. Ça s'appelle les Components V2 : de vrais boutons interactifs, colorés, cliquables, avec un callback quand l'utilisateur appuie dessus. La doc OpenClaw dit que c'est supporté. Il y a même un exemple dans la documentation avec le format JSON exact.

Sauf que ça ne marche pas …

Les cron jobs d'OpenClaw tournent dans un sandbox isolé. C'est voulu chaque exécution planifiée a son propre contexte pour ne pas polluer la session principale. Le problème c'est que dans ce sandbox, l'agent n'a pas accès au "message tool" de Discord. Il ne peut tout simplement pas envoyer de messages avec des boutons depuis un cron job. Il génère du texte, le framework l'envoie en mode "announce", et c'est tout. Un bloc de texte brut, sans interaction possible.

J'ai tenté la solution de repli : envoyer les boutons via la CLI. Les boutons s'affichent. Visuellement c'est parfait quatre boutons colorés sous chaque message. Tu cliques. Et là, message d'erreur : "Ce composant a expiré." À chaque fois. Sur chaque bouton. Le gateway OpenClaw ne registre pas de handler d'interaction pour les messages envoyés par la CLI. Les boutons sont décoratifs.

J'ai essayé toutes les combinaisons possibles. Mode announce. Mode no-deliver pour que l'agent utilise le message tool lui-même. Session main au lieu d'isolated. Session avec un ID explicite. L'agent en mode no-deliver me répond : "Je n'ai pas accès direct à la session Discord depuis ce contexte sandbox." En mode main, il ne trouve pas la session Discord. En mode announce, pas de boutons. Deux jours là-dessus. Rien ne marche.

Le problème est structurel. OpenClaw enregistre les handlers d'interaction uniquement quand un message est envoyé en réponse à un événement Discord entrant quand quelqu'un écrit dans un channel et que l'agent répond. Les cron jobs ne sont pas des événements Discord entrants. La CLI non plus. Donc pas de handler, donc les boutons expirent.

## Un agent autonome sur un VPS, avec tes clés API dedans

Quand j'ai installé OpenClaw, une des premières choses que j'ai faites c'est désactiver l'installation automatique des skills. Les skills sont des plugins communautaires n'importe qui peut en publier sur ClawHub, le marketplace officiel. Et je ne voulais pas qu'un agent autonome installe des trucs sans mon consentement sur ma machine.

J'avais raison de m'inquiéter. En creusant un peu, je suis tombé sur les articles de sécurité. Et c'est pas des blogs obscurs : Cisco, Trend Micro, Dark Reading, Fortune, The Hacker News tout le monde a couvert le sujet.

Les chiffres font froid dans le dos. Des chercheurs de Koi Security ont trouvé que sur 10 700 skills publiés sur ClawHub, plus de 820 étaient malveillants des keyloggers, des stealers, de l'exfiltration de données planquée derrière des noms innocents comme "solana-wallet-tracker". Cisco a testé un skill populaire d'OpenClaw et le verdict était clair : le skill contenait une instruction qui envoyait les données de l'utilisateur vers un serveur externe via curl. Bitsight a compté plus de 30 000 instances OpenClaw exposées sur internet public en deux semaines. CVE-2026-25253 permettait de voler le token d'authentification en une seule visite sur une page web malveillante. Score CVSS : 8.8.

Même en désactivant les skills communautaires, même en verrouillant le VPS avec fail2ban et UFW, même en restreignant l'agent à ne faire que de l'enrichissement de contenu — il reste ce malaise. OpenClaw a accès au système. Il exécute des commandes shell. Il stocke des tokens en clair dans un JSON. Et c'est une techno qui a quelques mois d'existence. Les CVE s'enchaînent. La Chine a carrément interdit son utilisation dans les administrations.

Est-ce que j'ai été compromis ? Non, je ne pense pas. Mais est-ce que je suis sûr que les permissions que j'ai configurées sont réellement respectées ? Honnêtement, je ne me suis pas assez penché sur le code source d'OpenClaw pour l'affirmer. Et c'est ça le problème de fond : un skill peut installer un autre skill, qui en installe un troisième, et dans la chaîne tu peux avoir une backdoor sans jamais l'avoir autorisée explicitement, même en étant sûr de la fiabilité des skills que tu as installé.

Pour un développeur qui teste en side project, c'est un risque calculé. Pour une utilisation en production, autonome, sur le long terme ? Je ne recommanderais pas.

## Virer OpenClaw, garder Claude

À ce stade le constat est simple. Ce qui fonctionne dans OpenClaw, c'est le LLM derrière — Claude. La génération de contenu, le ton du Chroniqueur, les suggestions de posts, tout ça c'est Claude qui le fait. OpenClaw n'est qu'un intermédiaire qui ajoute de la complexité, consomme des tokens pour son propre contexte, et ne sait pas gérer des interactions logicielles un peu « trop » avancées.

Alors j'ai fait ce que n'importe quel développeur ferait : j'ai viré l'intermédiaire. Un bot Discord en TypeScript. Le bot gère la connexion Discord, les boutons interactifs, le scheduler pour les tâches récurrentes. Quand il a besoin de générer du contenu comme une suggestion de post, un script TikTok, une réponse dans le ton du Chroniqueur, il appelle l'API Claude directement. Un appel, une réponse, du formatage propre, des boutons qui marchent et des garde-fous algorithmiques. Ouuufff !

Le pipeline que je construis maintenant c'est ça : tous les matins, SearXNG ratisse le web sur une dizaine de catégories et Claude analyse, score et classe tout ça en injectant mon profil de préférences, un profil qui se construit au fil de mes 👍/👎. Ensuite Claude me propose trois idées de contenu par jour dans le style du Chroniqueur, avec le hook, le script, la plateforme et les hashtags. Quand une idée me plaît, je clique Go et Claude me génère le script de prod seconde par seconde. Imagen génère les visuels dans le style dark fantasy du Chroniqueur. Veo 3.1 génère les segments vidéo de 6 secondes pour les TikToks en suivant le script. Moi je monte le tout sur CapCut, et je fais avancer chaque contenu de channel en channel dans Discord veille, idées, production, publication jusqu'au bouton Publier qui schedule tout sur Postiz vers Instagram et TikTok.

Moins de tokens consommés, des interactions fiables, un code que je maîtrise de bout en bout. Le Chroniqueur existe toujours. Il va poster ses premières anecdotes de sessions de JDR bientôt. Mais cette fois, c'est mon code qui le fait tourner, pas un framework opaque.

## Ce que le bot fait qu'OpenClaw ne savait pas faire

La veille technique tourne sur SearxNG auto-hébergé. OpenClaw recommande l'API Brave Search pour la veille sauf qu'elle est payante donc je suis passé par la recherche via sonnet 4.6, la consommation de tokens était sympa. SearxNG c'est la solution auto-hébergée la plus simple : un container Docker, mon propre moteur de recherche sur mon VPS, qui agrège les résultats de plusieurs sources. Pas de dépendance à une API tierce, pas de quota, pas de clé à gérer, pas de facture. Le bot scrape les tendances JDR sur TikTok, Instagram, Reddit, et stocke tout en local.

Et quand je dis "stocke", c'est dans une base SQLite avec de la recherche full-text via FTS5. Quand je veux retrouver une tendance repérée il y a deux semaines ou comparer les résultats de veille. Avec OpenClaw, pour chercher dans l'historique, il fallait rappeler Claude et recharger tout le contexte à chaque fois. Plus de tokens brûlés pour fouiller dans la mémoire que pour produire du contenu. Sans compter les hallucinations pour me fournir à tout prix une réponse.

Le bot contrôle exactement ce qui est envoyé à Claude. Je construis le prompt moi-même dans le code. Je sais ce qui rentre, je sais ce qui sort, je sais combien ça coûte enfin… la fourchette est moins grande. OpenClaw ajoutait son propre contexte système, ses métadonnées de session, ses instructions de framework du bruit que je payais en tokens sans l'avoir demandé.

Les boutons Discord marchent. Chaque suggestion est un message séparé avec quatre boutons : Go, Modifier, Skip, Plus tard. Tu cliques, le bot reçoit l'interaction, il agit.

Et le truc qui change tout pour la suite : le feedback manuel. Quand Claude génère une suggestion, je peux noter la qualité directement depuis Discord. Pas juste "Go" ou "Skip" un vrai retour sur ce qui était bien et ce qui ne l'était pas. Le bot stocke ces retours et les injecte dans les prochains prompts. Au fil du temps, les suggestions s'affinent parce que Claude reçoit l'historique de ce que j'ai aimé et ce que j'ai rejeté. C'est la boucle d'apprentissage que je voulais construire depuis le départ et qu'OpenClaw ne pouvait pas faire de manière fiable.

## Ce que j'en retiens

OpenClaw m'a fait perdre du temps. Mais pas pour rien. Sans cette expérience, je n'aurais pas compris ce qu'un agent IA sait vraiment faire et où ça bloque actuellement.

Parce que derrière les galères techniques, il y a un truc qu'on ne peut pas ignorer : le potentiel est réel. Claude écrit mieux que moi en marketing. Il tient un personnage fictif avec une voix cohérente sur des dizaines de générations. Il structure un script TikTok seconde par seconde, adapte le ton selon la plateforme, invente des anecdotes crédibles de sessions de JDR. Nano Banana génère des visuels dans un style précis. Veo 3.1 produit des segments vidéo de 6 secondes avec de l'audio synchronisé. Les briques sont là. Individuellement, elles fonctionnent.

Ce qui manque, c'est la colle entre les briques. Et c'est exactement ce qu'OpenClaw essaie d'être sauf qu'en mars 2026, cette colle ne tient pas encore. Les frameworks agentiques sont jeunes. Les interactions avec les services externes cassent dès qu'on sort du happy path. La sécurité est un chantier ouvert.

Mais imaginons un instant que ça mûrisse. Un framework stable, audité, avec une vraie interopérabilité entre les services. Un agent qui appelle Claude pour le texte, Veo pour la vidéo, Postiz pour la publication, SearxNG pour la veille, et qui orchestre tout ça avec des interactions Discord fiables. Un agent qui apprend de tes retours au fil des mois, qui affine son ton, qui comprend quel format marche le mieux sur quelle plateforme à quelle heure. Pas un gadget un vrai collaborateur numérique.

Ce que j'entrevois avec cette expérience, c'est que le métier de community manager va se transformer profondément. Pas disparaître — se transformer. Le jour où un développeur solo pourra déployer un agent qui gère une présence en ligne cohérente, qui scrape les tendances, qui génère du contenu adapté, qui publie, qui répond aux commentaires dans le ton du personnage, et qui s'améliore avec le temps ce jour-là, la barrière entre "je sais coder" et "je sais vendre" sera plus basse que jamais.

On n'y est pas. Mais on voit la route. Et le fait qu'un dev seul dans son salon puisse déjà construire un pipeline veille → IA → contenu → publication avec des outils qui existent aujourd'hui, même si c'est avec du bricolage, ça dit quelque chose sur la direction que ça prend.

L'autonomie totale des agents, c'est pas pour 2026. Mais je parie que ce ne sera pas pour 2030 non plus. Quelque part entre les deux, les frameworks vont rattraper la puissance des LLM. Et là, ça va devenir très intéressant.

---

**Références :**

- [Cisco — "Personal AI Agents like OpenClaw Are a Security Nightmare"](https://blogs.cisco.com/ai/personal-ai-agents-like-openclaw-are-a-security-nightmare)
- [Dark Reading — "Critical OpenClaw Vulnerability Exposes AI Agent Risks"](https://www.darkreading.com/application-security/critical-openclaw-vulnerability-ai-agent-risks)
- [The Hacker News — "ClawJacked Flaw Lets Malicious Sites Hijack Local OpenClaw"](https://thehackernews.com/2026/02/clawjacked-flaw-lets-malicious-sites.html)
- [Fortune — "Why OpenClaw has security experts on edge"](https://fortune.com/2026/02/12/openclaw-ai-agents-security-risks-beware/)
- [Trend Micro — "What OpenClaw Reveals About Agentic Assistants"](https://www.trendmicro.com/en_us/research/26/b/what-openclaw-reveals-about-agentic-assistants.html)
- [Bitsight — "OpenClaw Security Risks: Exposed AI Agents"](https://www.bitsight.com/blog/openclaw-ai-security-risks-exposed-instances)
