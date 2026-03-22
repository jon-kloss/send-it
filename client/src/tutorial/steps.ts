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
      "Claude might ask for your permission before creating files — just press Enter or type 1 to say yes!",
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
    title: "Try something wild",
    description:
      "Your site looks great — but let's have some fun! Ask Claude to change the colors to something totally crazy. Don't worry, we're going to undo this in the next step!",
    prompts: {
      portfolio: [
        {
          text: "Change all the colors on my website to neon green and hot pink. Make everything super bright and flashy. Go crazy with it!",
          description: "Claude will make it hilariously ugly",
        },
      ],
      recipe: [
        {
          text: "Change all the colors on my recipe site to neon green and hot pink. Make everything super bright and flashy. Go crazy with it!",
          description: "Claude will make it hilariously ugly",
        },
      ],
      todo: [
        {
          text: "Change all the colors on my to-do app to neon green and hot pink. Make everything super bright and flashy. Go crazy with it!",
          description: "Claude will make it hilariously ugly",
        },
      ],
    },
    tips: [
      "Yes, we're making it ugly on purpose! Trust the process.",
      "Look at the preview — pretty wild, right? Don't worry, the next step will fix everything!",
    ],
    hasBeforeAfter: true,
    completionCheck: {
      anyFileChange: true,
    },
  },
  {
    id: 5,
    title: "Undo! Go back!",
    description:
      "Yikes, that's ugly! Here's one of the most powerful things about Claude — you can tell it to undo what it just did. Try it now!",
    prompts: {
      portfolio: [
        {
          text: "Undo that! Go back to the nice blue and white colors from before.",
          description: "Claude will revert to the good design",
        },
      ],
      recipe: [
        {
          text: "Undo that! Go back to the warm cozy colors from before.",
          description: "Claude will revert to the good design",
        },
      ],
      todo: [
        {
          text: "Undo that! Go back to the clean minimal look from before.",
          description: "Claude will revert to the good design",
        },
      ],
    },
    tips: [
      "See? You can never mess things up permanently! Just tell Claude to undo and it goes right back.",
      "This works anytime — if Claude ever changes something you liked, just say 'undo that' or 'go back to how it was'.",
      "This is your safety net for the rest of the tutorial. Experiment freely!",
    ],
    achievement: { id: "time-traveler", title: "Time Traveler", emoji: "⏪" },
    hasBeforeAfter: true,
    completionCheck: {
      anyFileChange: true,
    },
  },
  {
    id: 6,
    title: "Add your first content",
    description:
      "Now that you know you can always undo, let's get back to building! Add one real piece of content to your site.",
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
      "Curious about something? Ask Claude 'why did you do it that way?' and it'll explain in simple terms!",
    ],
    completionCheck: {
      anyFileChange: true,
    },
  },
  {
    id: 7,
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
      "Claude remembers everything you've built so far — you can reference earlier steps like 'match the style from before'.",
    ],
    hasBeforeAfter: true,
    completionCheck: {
      anyFileChange: true,
    },
  },
  {
    id: 8,
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
      "Notice how Claude might update multiple files at once — it keeps everything in sync automatically!",
    ],
    hasBeforeAfter: true,
    completionCheck: {
      anyFileChange: true,
    },
  },
  {
    id: 9,
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
      "If Claude pauses to think for a moment, that's normal! It's planning how to make things interactive.",
      "When Claude asks permission, you can say no! It'll try a different approach. You're always in control.",
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
    id: 10,
    title: "Break it on purpose",
    description:
      "Here's a secret about building things: stuff breaks sometimes — and that's totally fine! Let's intentionally cause an error so you can learn the most important skill: telling Claude to fix it.",
    prompts: {
      portfolio: [
        {
          text: "Add a script tag at the very top of the page that tries to call a function called initializePortfolio() — but don't create that function. I want to see what an error looks like.",
          description: "This will cause an error that shows up in the preview!",
        },
      ],
      recipe: [
        {
          text: "Add a script tag at the very top of the page that tries to call a function called initializeRecipes() — but don't create that function. I want to see what an error looks like.",
          description: "This will cause an error that shows up in the preview!",
        },
      ],
      todo: [
        {
          text: "Add a script tag at the very top of the page that tries to call a function called initializeTasks() — but don't create that function. I want to see what an error looks like.",
          description: "This will cause an error that shows up in the preview!",
        },
      ],
    },
    tips: [
      "Yes, we're breaking it on purpose! Look at the preview — you should see a red error message appear.",
      "Don't panic when you see the error! The next step will teach you exactly what to do.",
      "Errors happen all the time when building things — even to professional developers!",
    ],
    completionCheck: { anyFileChange: true },
  },
  {
    id: 11,
    title: "Copy the error to Claude!",
    description:
      "See that red error in the preview? Here's the most useful trick you'll learn today: just copy the error message and paste it to Claude. You don't need to understand what it means — Claude will read it and fix the problem!",
    prompts: {
      portfolio: [
        {
          text: "I'm getting this error: \"initializePortfolio is not defined\". Can you fix it? Make it actually do something cool — like show a welcome animation when the page loads.",
          description: "Paste the error and tell Claude what you wanted instead",
        },
      ],
      recipe: [
        {
          text: "I'm getting this error: \"initializeRecipes is not defined\". Can you fix it? Make it actually do something useful — like show how many recipes are on the page.",
          description: "Paste the error and tell Claude what you wanted instead",
        },
      ],
      todo: [
        {
          text: "I'm getting this error: \"initializeTasks is not defined\". Can you fix it? Make it actually do something useful — like show today's date at the top of the list.",
          description: "Paste the error and tell Claude what you wanted instead",
        },
      ],
    },
    tips: [
      "This is probably the most useful thing you'll learn today — whenever you see an error, just copy it and send it to Claude!",
      "You don't need to understand the error. Claude reads it, figures out what went wrong, and fixes it.",
      "This works with any error, anytime. Just copy, paste, and ask Claude to fix it!",
    ],
    achievement: {
      id: "debugger",
      title: "Bug Squasher",
      emoji: "🐛",
    },
    completionCheck: { anyFileChange: true },
  },
  {
    id: 12,
    title: "Remember this?",
    description:
      "One last superpower — Claude remembers your entire conversation. You can reference anything from earlier and it knows exactly what you mean. Try it!",
    prompts: {
      portfolio: (name) => [
        {
          text: `Remember the colors and style from when we first made the site look nice? Use those same colors, but this time add a footer at the bottom with ${name}'s name and the current year. Also add smooth scrolling when clicking menu links.`,
          description: "Claude will recall your earlier design and add to it",
        },
      ],
      recipe: [
        {
          text: "Remember the warm cozy style from when we first designed the site? Make sure it still looks like that, and add a 'back to top' button that appears when I scroll down. Also add a search bar at the top that filters recipes.",
          description: "Claude will recall your earlier design and add to it",
        },
      ],
      todo: [
        {
          text: "Remember the clean minimal style from earlier? Make sure it still looks like that, and add a counter at the bottom showing how many tasks are left. Also make it so clicking a task checks it off with a satisfying animation.",
          description: "Claude will recall your earlier design and add to it",
        },
      ],
    },
    tips: [
      "Claude remembered what you built earlier — it has the whole conversation in its memory!",
      "You can always reference earlier things: 'go back to that blue from step 3' or 'use the same style as before'.",
      "Everything Claude built is saved on this computer — it's yours to keep!",
      "Pro tip: type /help in Claude to see all the special commands you can use!",
      "If the conversation gets really long, type /compact to help Claude stay focused.",
    ],
    achievement: { id: "shipped", title: "Shipped!", emoji: "🚀" },
    hasBeforeAfter: true,
    completionCheck: { anyFileChange: true },
  },
];

export const TOTAL_STEPS = STEPS.length;
