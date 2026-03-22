import type { TutorialStep } from "./types";

export const STEPS: TutorialStep[] = [
  {
    id: 1,
    title: "Say hello to Claude",
    description:
      "Let's start by waking up your AI assistant! Copy the word below and paste it into the dark window on the left. That's how you start a conversation with Claude.",
    prompts: {
      portfolio: [
        {
          text: "claude",
          description: "This opens Claude so you can start chatting",
        },
      ],
      recipe: [
        {
          text: "claude",
          description: "This opens Claude so you can start chatting",
        },
      ],
      todo: [
        {
          text: "claude",
          description: "This opens Claude so you can start chatting",
        },
      ],
    },
    tips: [
      "The dark window on the left is called a terminal — think of it like a text chat with your computer.",
      "Don't worry if it looks unfamiliar! You'll get the hang of it quickly.",
    ],
    achievement: { id: "first-contact", title: "First Contact", emoji: "👋" },
    completionCheck: {
      terminalPattern: /Claude\s*Code|ClaudeCode/i,
    },
  },
  {
    id: 2,
    title: "Create your first page",
    description:
      "Now tell Claude what you want to build — just a simple starting point! Watch the right side of the screen — your website will appear there as Claude builds it.",
    prompts: {
      portfolio: (name) => [
        {
          text: `Build me a simple personal website with the name '${name}' at the top and a one-sentence bio underneath. Keep it super simple for now.`,
          description: "Claude will create a simple starting page",
        },
      ],
      recipe: [
        {
          text: "Build me a simple recipe website with just the title 'My Recipes' at the top and a short welcome message underneath. Keep it super simple for now.",
          description: "Claude will create a simple starting page",
        },
      ],
      todo: [
        {
          text: "Build me a simple to-do list with just a title that says 'My To-Do List' and an empty list area. Keep it super simple for now.",
          description: "Claude will create a simple starting page",
        },
      ],
    },
    tips: [
      "Watch the right side — your website will appear there as Claude builds it!",
      "You don't need to understand anything Claude writes. Just focus on what appears on the right!",
    ],
    achievement: { id: "creator", title: "Creator", emoji: "🎨" },
    completionCheck: {
      hasFileWithExtension: [".html"],
    },
  },
  {
    id: 3,
    title: "Make it look nice",
    description:
      "Your page is there but it looks pretty plain. Let's give it some personality! Tell Claude what colors and style you like.",
    prompts: {
      portfolio: [
        {
          text: "Use your frontend design skill to make my website look really modern and professional. Use a blue and white color scheme, a clean sans-serif font, nice spacing between sections, subtle shadows on cards, and a hero section at the top with a gradient background. Make it look like a real professional portfolio.",
          description: "Claude will activate a special skill to style your page",
        },
      ],
      recipe: [
        {
          text: "Use your frontend design skill to make my recipe site look warm and cozy. Use oranges and cream colors with a friendly rounded font.",
          description: "Claude will activate a special skill to style your page",
        },
      ],
      todo: [
        {
          text: "Use your frontend design skill to make my to-do list look clean and minimal. Use a light background with rounded corners and a modern font.",
          description: "Claude will activate a special skill to style your page",
        },
      ],
    },
    tips: [
      "Be specific about what you like — 'I want blue and white' works better than 'make it nice'.",
      "If you don't like what Claude made, just say so! Try: 'I'd prefer different colors' or 'Make the text bigger'.",
      "Notice how Claude might activate a special 'skill' — that's like a superpower that makes it even better at design!",
    ],
    achievement: { id: "designer", title: "Designer", emoji: "✨" },
    hasBeforeAfter: true,
    completionCheck: {
      anyFileChange: true,
    },
  },
  {
    id: 4,
    title: "Add your first content",
    description:
      "Now let's add one real piece of content. Just one thing for now — we'll add more later!",
    prompts: {
      portfolio: [
        {
          text: "Add one project to my portfolio. Call it 'My Cool App' with a short description of what it does. Make it look like a nice card.",
          description: "Claude will add your first project",
        },
      ],
      recipe: [
        {
          text: "Add one recipe to my site — chocolate chip cookies. Show the name, how long it takes, and a list of ingredients. Make it look like a nice card.",
          description: "Claude will add your first recipe",
        },
      ],
      todo: [
        {
          text: "Add a text box where I can type a new task and a button to add it to the list. Don't worry about making it work yet, just make it look good.",
          description: "Claude will add a task input",
        },
      ],
    },
    tips: [
      "We're building one piece at a time — that's how the pros do it!",
      "You can always tell Claude to change what it made: 'Make the description longer' or 'Use a different name'.",
    ],
    completionCheck: {
      anyFileChange: true,
    },
  },
  {
    id: 5,
    title: "Add more content",
    description:
      "Nice! Now let's add a few more things to fill out your site. This is where it starts to feel real!",
    prompts: {
      portfolio: [
        {
          text: "Add two more project cards — one called 'Photo Gallery' and one called 'Weather Tracker'. Give each a short description. Line them up nicely next to the first one.",
          description: "Claude will add more projects",
        },
      ],
      recipe: [
        {
          text: "Add two more recipes — a simple pasta dish and a fruit smoothie. Give each one ingredients and prep time, just like the cookies. Line them up nicely.",
          description: "Claude will add more recipes",
        },
      ],
      todo: [
        {
          text: "Add 3 example tasks to the list: 'Buy groceries', 'Call mom', and 'Go for a walk'. Make one of them already checked off.",
          description: "Claude will add some sample tasks",
        },
      ],
    },
    tips: [
      "See how your site is growing? You're building it piece by piece!",
      "Want different content? Just tell Claude what you'd prefer instead.",
    ],
    hasBeforeAfter: true,
    completionCheck: {
      anyFileChange: true,
    },
  },
  {
    id: 6,
    title: "Add a menu bar",
    description:
      "Most websites have a menu at the top so people can jump to different sections. Let's add one!",
    prompts: {
      portfolio: [
        {
          text: "Add a menu bar at the top with links to Home, About, and Projects. Make it stick to the top when I scroll down.",
          description: "Claude will add a menu",
        },
      ],
      recipe: [
        {
          text: "Add a menu bar at the top with links to Home and Recipes. Make it stick to the top when I scroll down.",
          description: "Claude will add a menu",
        },
      ],
      todo: [
        {
          text: "Add a bar at the top with the app title on the left and a 'Clear completed' button on the right.",
          description: "Claude will add a toolbar",
        },
      ],
    },
    tips: [
      "A menu bar helps visitors find their way around — like a table of contents!",
      "Don't like the style? Try: 'Make the menu darker' or 'Change the menu layout'.",
    ],
    hasBeforeAfter: true,
    completionCheck: {
      anyFileChange: true,
    },
  },
  {
    id: 7,
    title: "Make it do something",
    description:
      "Right now your website just sits there. Let's make one thing interactive — something that actually responds when you click it!",
    prompts: {
      portfolio: [
        {
          text: "Add a button that switches my website between light mode and dark mode. Make the colors change smoothly.",
          description: "Claude will add a dark mode toggle",
        },
      ],
      recipe: [
        {
          text: "Make each recipe card clickable — when I click one, it should expand to show the full ingredients. Click again to collapse it.",
          description: "Claude will make recipes expandable",
        },
      ],
      todo: [
        {
          text: "Make the add button actually work! When I type a task and click the button, it should appear in the list.",
          description: "Claude will make adding tasks work",
        },
      ],
    },
    tips: [
      "This is where it gets fun — your website will actually respond to clicks!",
      "Just describe what you want to happen and Claude figures out the rest.",
    ],
    achievement: {
      id: "programmer",
      title: "Programmer",
      emoji: "⚡",
    },
    completionCheck: {
      anyFileChange: true,
    },
  },
  {
    id: 8,
    title: "Add a visual touch",
    description:
      "Let's add one eye-catching detail that makes your site feel more polished and alive.",
    prompts: {
      portfolio: (name) => [
        {
          text: `Add a colorful gradient background behind ${name}'s name at the top and make it fade in smoothly when the page loads.`,
          description: "Claude will add a visual touch",
        },
      ],
      recipe: [
        {
          text: "Add a fun emoji next to each recipe name — like 🍪 for cookies, 🍝 for pasta, and 🥤 for smoothie.",
          description: "Claude will add recipe emojis",
        },
      ],
      todo: [
        {
          text: "Add a fun animation when I check off a task — like a satisfying strikethrough effect.",
          description: "Claude will add a check-off animation",
        },
      ],
    },
    tips: [
      "Little visual touches make your site feel alive and professional!",
      "You can always say 'Make it more subtle' or 'Make it bolder' to adjust.",
    ],
    completionCheck: { anyFileChange: true },
  },
  {
    id: 9,
    title: "Make it work on phones",
    description:
      "Most people look at websites on their phones. Let's make sure yours looks great on a small screen too!",
    prompts: {
      portfolio: [
        {
          text: "Make my website look good on phones. Stack everything in a single column on small screens and make sure buttons are big enough to tap.",
          description: "Claude will make it phone-friendly",
        },
      ],
      recipe: [
        {
          text: "Make my recipe site look good on phones. Stack the recipe cards in one column on small screens and make the text easy to read.",
          description: "Claude will make it phone-friendly",
        },
      ],
      todo: [
        {
          text: "Make my to-do app work well on phones. Make sure the text box and buttons are easy to tap with a finger.",
          description: "Claude will make it phone-friendly",
        },
      ],
    },
    tips: [
      "Try making the preview panel narrower to see how your site looks on a smaller screen!",
      "When a site works on any screen size, that's called 'responsive design' — and you just did it!",
    ],
    achievement: {
      id: "responsive",
      title: "Mobile Master",
      emoji: "📱",
    },
    hasBeforeAfter: true,
    completionCheck: {
      anyFileChange: true,
    },
  },
  {
    id: 10,
    title: "Change something you don't like",
    description:
      "Here's the real magic — you can just tell Claude to change anything. Try tweaking something! This is how people actually build websites: make it, look at it, adjust.",
    prompts: {
      portfolio: [
        {
          text: "I want to try different colors — change it to purple and gold instead.",
          description: "Try a whole new color scheme",
        },
      ],
      recipe: [
        {
          text: "Change the colors to dark green and cream — I want it to feel more earthy and natural.",
          description: "Try a whole new color scheme",
        },
      ],
      todo: [
        {
          text: "Show a counter at the bottom that says how many tasks I still have left to do.",
          description: "Add a task counter",
        },
      ],
    },
    tips: [
      "This is the magic — just describe what you want changed and Claude handles it!",
      "Try being casual: 'I don't love the font, can you try something more playful?'",
      "If Claude changes something you liked, just say: 'Actually, change that back'.",
    ],
    completionCheck: { anyFileChange: true },
  },
  {
    id: 11,
    title: "Add something special",
    description:
      "Let's add one more feature that makes your site uniquely yours. Pick one of these ideas or come up with something completely different!",
    prompts: {
      portfolio: [
        {
          text: "Add a simple contact form where someone can type their name, email, and a message to me.",
          description: "Add a way for people to reach you",
        },
      ],
      recipe: [
        {
          text: "Add a heart button on each recipe. When I click it, the heart should turn red to mark it as a favorite.",
          description: "Add a favorites feature",
        },
      ],
      todo: [
        {
          text: "Make it so clicking a task checks it off, and add a fun confetti celebration when all tasks are done!",
          description: "Add check-off and celebration",
        },
      ],
    },
    tips: [
      "This is YOUR website — add whatever sounds fun to you!",
      "You're not limited to these ideas. Try asking Claude for anything you can imagine.",
    ],
    achievement: {
      id: "innovator",
      title: "Innovator",
      emoji: "💡",
    },
    completionCheck: { anyFileChange: true },
  },
  {
    id: 12,
    title: "You did it!",
    description:
      "Congratulations — you just built a real website by having a conversation with AI! You didn't write a single line of code yourself. You just described what you wanted, and Claude built it. The website you made is saved on this computer, and you could even put it on the internet for the whole world to see!",
    prompts: {
      portfolio: [
        {
          text: "Can you tell me what you built for me? Give me a simple summary and tell me how I could share it online.",
          description: "Get a summary of what was built",
        },
      ],
      recipe: [
        {
          text: "Can you tell me what you built for me? Give me a simple summary and tell me how I could share it online.",
          description: "Get a summary of what was built",
        },
      ],
      todo: [
        {
          text: "Can you tell me what you built for me? Give me a simple summary and tell me how I could share it online.",
          description: "Get a summary of what was built",
        },
      ],
    },
    tips: [
      "Everything Claude built is saved on this computer — it's yours to keep!",
      "You can keep chatting with Claude to add even more features anytime.",
      "Try building something completely different next time — the sky's the limit!",
    ],
    achievement: { id: "shipped", title: "Shipped!", emoji: "🚀" },
    hasBeforeAfter: true,
    completionCheck: { anyFileChange: true },
  },
];

export const TOTAL_STEPS = STEPS.length;
