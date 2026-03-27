---
title: Voilà pourquoi OpenClaw est sur coté
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
draft: false
---
Je suis développeur full-stack. Pas marketeur. En mars 2026, j'ai voulu tester les agents IA autonomes pour de vrai, pas juste jouer avec un prompt, mais mettre les mains dans un système agentique en conditions réelles. J'ai un side project, une app qui s'appelle Tumulte. L'idée : apprendre le marketing en laissant une IA le faire à ma place, et au passage comprendre où en sont vraiment ces technologies.

OpenClaw, c'est un framework open source pour faire tourner des agents IA sur des plateformes de messagerie : Discord, Telegram, WhatsApp. L'agent a de la mémoire, des compétences configurables, des cron jobs. Je me suis dit : c'est le bon moment.

## Ça démarre vite, les doutes aussi

L'installation se fait dans la journée. VPS, bot Discord, gateway, les premiers skills configurés. L'agent répond, les cron jobs tournent. Jusque-là, pas de souci.

C'est en regardant de plus près que les questions commencent. Tout repose sur des fichiers Markdown, les "skills", que l'agent lit avant de répondre. On décrit le comportement attendu en langage naturel, et l'agent interprète. C'est du prompting, ni plus ni moins. Et quand on utilise l'IA au quotidien, on sait une chose : même prompt, même modèle, les résultats ne sont jamais identiques. Jamais.

Concrètement, l'agent ne se comporte pas exactement pareil d'un run à l'autre. Des petites hallucinations, des dérives légères dans le ton, un mot interdit qui passe, une suggestion qui ressemble à un pitch au lieu d'une anecdote. Rien de dramatique, mais rien de robuste non plus. Je suis habitué à des systèmes déterministes, incrémentaux, testables. Là, ça gratte.

Je sentais déjà qu'on allait toucher une limite. Mais j'ai continué, naïvement, pour tester le framework en immersion complète.

## Les tokens fondent, et tu ne sais pas pourquoi

Première vraie claque : les coûts. À chaque cron job, OpenClaw charge tout le contexte dans le prompt envoyé au LLM : skills, mémoire de session, instructions système du framework. Mon SKILL.md faisait 800 lignes : tout le pipeline de décision du Chroniqueur y était décrit. À chaque exécution, l'agent consommait entre 20 000 et 30 000 tokens de base, sans compter l'utilisation des données passées pour enrichir la réponse. Cinq cron jobs par jour. Fais le calcul.

Et impossible de maîtriser ce qui est injecté dans le prompt. OpenClaw ajoute son propre contexte système, les infos de session, les métadonnées du channel Discord. Je voyais le résultat, je voyais la facture, mais la boîte noire entre les deux restait opaque. Quand je ne peux pas inspecter ce qui se passe entre mon input et mon output, ça me met mal à l'aise.

J'ai essayé de mettre en place un channel Discord dédié aux logs, un récapitulatif quotidien de tout ce que l'agent avait fait : veilles effectuées, idées générées, publications, erreurs. L'idée, c'était d'avoir de la visibilité sur la machine. Les logs étaient inconstants. Certains jours, formatés correctement. D'autres, un bloc de texte vague sans structure. Et certains jours, rien du tout. Pas d'erreur, pas de log, juste le silence. Pour savoir si l'agent avait tourné, il fallait aller fouiller les fichiers sur le VPS.

## Les boutons Discord : là où tout s'effondre

Mon workflow reposait sur un principe simple. L'agent propose des suggestions de contenu dans un channel Discord. Je clique sur un bouton pour valider, modifier ou rejeter chaque suggestion. Go, Modifier, Skip, Plus tard. Quatre boutons, un par suggestion. C'est comme ça que l'agent devait apprendre avec le temps : en observant mes choix, en notant ce que je skip, en affinant ce qu'il propose.

Discord permet ça nativement. Les Components V2 : de vrais boutons interactifs, colorés, cliquables, avec un callback quand l'utilisateur appuie dessus. La doc OpenClaw dit que c'est supporté. Il y a même un exemple avec le format JSON exact.

Sauf que ça ne marche pas.

Les cron jobs d'OpenClaw tournent dans un sandbox isolé. C'est voulu, chaque exécution planifiée a son propre contexte pour ne pas polluer la session principale. Le problème, c'est que dans ce sandbox, l'agent n'a pas accès au "message tool" de Discord. Il ne peut pas envoyer de messages avec des boutons depuis un cron job. Il génère du texte, le framework l'envoie en mode "announce", et c'est tout. Un bloc de texte brut, sans interaction possible.

J'ai tenté la solution de repli : envoyer les boutons via la CLI. Les boutons s'affichent. Visuellement, c'est parfait, quatre boutons colorés sous chaque message. Je clique. Message d'erreur : "Ce composant a expiré." À chaque fois. Sur chaque bouton. Le gateway OpenClaw ne registre pas de handler d'interaction pour les messages envoyés par la CLI. Les boutons sont décoratifs.

J'ai essayé toutes les combinaisons possibles. Mode announce. Mode no-deliver pour que l'agent utilise le message tool lui-même. Session main au lieu d'isolated. Session avec un ID explicite. En no-deliver, l'agent me répond : "Je n'ai pas accès direct à la session Discord depuis ce contexte sandbox." En mode main, il ne trouve pas la session Discord. En mode announce, pas de boutons. Deux jours là-dessus. Rien ne marche.

Le problème est structurel. OpenClaw enregistre les handlers d'interaction uniquement quand un message est envoyé en réponse à un événement Discord entrant, quand quelqu'un écrit dans un channel et que l'agent répond. Les cron jobs ne sont pas des événements Discord entrants. La CLI non plus. Donc pas de handler, donc les boutons expirent.

## Un agent autonome sur un VPS, avec tes clés API dedans

Quand j'ai installé OpenClaw, une des premières choses que j'ai faites, c'est désactiver l'installation automatique des skills. Les skills sont des plugins communautaires, n'importe qui peut en publier sur ClawHub, le marketplace officiel. Je ne voulais pas qu'un agent autonome installe des trucs sans mon consentement sur ma machine.

J'avais raison de m'inquiéter. En creusant un peu, je suis tombé sur des articles de sécurité publiés par Cisco, Trend Micro, Dark Reading, Fortune, The Hacker News.

Les chiffres : des chercheurs de Koi Security ont trouvé que sur 10 700 skills publiés sur ClawHub, plus de 820 étaient malveillants : keyloggers, stealers, exfiltration de données derrière des noms comme "solana-wallet-tracker". Cisco a testé un skill populaire et a trouvé une instruction qui envoyait les données utilisateur vers un serveur externe via curl. Bitsight a compté plus de 30 000 instances OpenClaw exposées sur internet public en deux semaines. CVE-2026-25253 permettait de voler le token d'authentification en une seule visite sur une page web malveillante. Score CVSS : 8.8.

Même en désactivant les skills communautaires, même en verrouillant le VPS avec fail2ban et UFW, même en restreignant l'agent à de l'enrichissement de contenu, il reste ce malaise. OpenClaw a accès au système. Il exécute des commandes shell. Il stocke des tokens en clair dans un JSON. Et c'est une techno qui a quelques mois d'existence. Les CVE s'enchaînent. La Chine a interdit son utilisation dans les administrations.

Est-ce que j'ai été compromis ? Je ne pense pas. Mais est-ce que je suis sûr que les permissions que j'ai configurées sont réellement respectées ? Je ne me suis pas assez penché sur le code source d'OpenClaw pour l'affirmer. Et c'est ça le problème de fond : un skill peut installer un autre skill, qui en installe un troisième, et dans la chaîne il peut y avoir une backdoor sans qu'on l'ait jamais autorisée explicitement.

Pour un dev qui teste en side project, c'est un risque calculé. Pour une utilisation en production, autonome, sur le long terme, je ne recommanderais pas.

## Virer OpenClaw, garder Claude

À ce stade, le constat est simple. Ce qui fonctionne dans OpenClaw, c'est le LLM derrière, Claude. La génération de contenu, le ton du Chroniqueur, les suggestions de posts : c'est Claude qui fait le travail. OpenClaw n'est qu'un intermédiaire qui ajoute de la complexité, consomme des tokens pour son propre contexte, et casse dès qu'on sort du happy path.

Alors j'ai fait ce que n'importe quel développeur ferait : j'ai viré l'intermédiaire. Un bot Discord en TypeScript. Le bot gère la connexion Discord, les boutons interactifs, le scheduler. Quand il a besoin de générer du contenu, il appelle l'API Claude directement. Un appel, une réponse, du formatage propre, des boutons qui marchent, des garde-fous algorithmiques.

Le pipeline maintenant : SearXNG ratisse le web chaque matin, Claude analyse et classe les résultats selon mon profil de préférences (qui se construit au fil de mes 👍/👎), puis me propose trois idées de contenu par jour. Quand une idée me plaît, je clique Go et Claude génère le script de prod. Nano Banana s'occupe des visuels dans le style dark fantasy du Chroniqueur. Veo 3.1 génère les segments vidéo. Je monte le tout sur CapCut, et je fais avancer chaque contenu de channel en channel dans Discord, veille, idées, production, publication, jusqu'au bouton Publier qui schedule tout via Postiz.

Moins de tokens consommés, des interactions fiables, un code que je maîtrise de bout en bout.

## La boucle de feedback : ce qu'OpenClaw ne pouvait pas faire

Le vrai gain du bot custom, c'est la boucle d'apprentissage.

Quand Claude génère une suggestion, je peux noter la qualité directement depuis Discord. Pas juste "Go" ou "Skip", un vrai retour sur ce qui était bien et ce qui ne l'était pas. Le bot stocke ces retours dans une base SQLite avec recherche full-text via FTS5, et les injecte dans les prochains prompts. Au fil du temps, les suggestions s'affinent parce que Claude reçoit l'historique de ce que j'ai aimé et de ce que j'ai rejeté.

La veille, pareil. SearXNG auto-hébergé dans un container Docker, zéro dépendance à une API tierce. Avec OpenClaw, pour chercher dans l'historique, il fallait rappeler Claude et recharger tout le contexte à chaque fois, plus de tokens brûlés pour fouiller dans la mémoire que pour produire du contenu.

C'est cette boucle que je voulais construire depuis le départ. OpenClaw ne pouvait pas la faire de manière fiable.

## Ce que j'en retiens

OpenClaw m'a fait perdre du temps. Mais pas pour rien. Sans cette expérience, je n'aurais pas compris ce qu'un agent IA sait vraiment faire et où ça bloque.

Le potentiel est réel. Claude tient un personnage fictif avec une voix cohérente sur des dizaines de générations. Il structure un script TikTok seconde par seconde, adapte le ton selon la plateforme, invente des anecdotes crédibles de sessions de JDR. Nano Banana génère des visuels dans un style précis. Veo 3.1 produit des segments vidéo synchronisés. Les briques fonctionnent individuellement.

Ce qui manque, c'est la colle. Et c'est exactement ce qu'OpenClaw essaie d'être, sauf qu'en mars 2026, cette colle ne tient pas. Les frameworks agentiques sont jeunes. Les interactions avec les services externes cassent dès qu'on sort du happy path. La sécurité est un chantier ouvert.

Mais ce que j'entrevois, c'est que le métier de community manager va se transformer. Pas disparaître. Le jour où un dev solo pourra déployer un agent qui gère une présence en ligne cohérente, veille, contenu, publication, réponses aux commentaires dans le ton du personnage, apprentissage continu, la barrière entre "je sais coder" et "je sais vendre" sera au ras du sol. Le fait qu'un dev seul puisse déjà construire un pipeline veille → IA → contenu → publication avec les outils de 2026, même bricolé, dit quelque chose sur la direction que ça prend.

L'autonomie totale des agents, c'est pas pour cette année. Quelque part dans les deux ou trois ans qui viennent, les frameworks vont rattraper la puissance des LLM. Et là, le jeu change.

---

**Références :**
- [Cisco, "Personal AI Agents like OpenClaw Are a Security Nightmare"](https://blogs.cisco.com/ai/personal-ai-agents-like-openclaw-are-a-security-nightmare)
- [Dark Reading, "Critical OpenClaw Vulnerability Exposes AI Agent Risks"](https://www.darkreading.com/application-security/critical-openclaw-vulnerability-ai-agent-risks)
- [The Hacker News, "ClawJacked Flaw Lets Malicious Sites Hijack Local OpenClaw"](https://thehackernews.com/2026/02/clawjacked-flaw-lets-malicious-sites.html)
- [Fortune, "Why OpenClaw has security experts on edge"](https://fortune.com/2026/02/12/openclaw-ai-agents-security-risks-beware/)
- [Trend Micro, "What OpenClaw Reveals About Agentic Assistants"](https://www.trendmicro.com/en_us/research/26/b/what-openclaw-reveals-about-agentic-assistants.html)
- [Bitsight, "OpenClaw Security Risks: Exposed AI Agents"](https://www.bitsight.com/blog/openclaw-ai-security-risks-exposed-instances)

---

*Je développe Tumulte, un système de sondages multi-streams pour le JDR sur Twitch. Si tu es MJ et que tu veux que tes viewers participent à tes sessions, c'est sur [tumulte.app](https://tumulte.app).*
