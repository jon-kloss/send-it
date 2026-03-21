import type { TutorialStep } from "./types";

export const STEPS: TutorialStep[] = [
  {
    id: 1,
    title: "Say hello to Claude",
    description:
      "Let's start by opening Claude Code! Type the command below into the terminal on the left. Claude is an AI that can write code for you — all you have to do is tell it what you want.",
    prompts: {
      portfolio: [
        {
          text: "claude",
          description: "This starts Claude Code so you can chat with it",
        },
      ],
      recipe: [
        {
          text: "claude",
          description: "This starts Claude Code so you can chat with it",
        },
      ],
      todo: [
        {
          text: "claude",
          description: "This starts Claude Code so you can chat with it",
        },
      ],
    },
    tips: [
      "The terminal is like a text messenger for your computer — you type commands and it responds.",
      "Don't worry if it looks unfamiliar! You'll get the hang of it quickly.",
    ],
    achievement: { id: "first-contact", title: "First Contact", emoji: "👋" },
  },
  {
    id: 2,
    title: "Create your first page",
    description:
      "Now let's ask Claude to create the basic structure of your website. Just copy the prompt below and paste it into the terminal. Watch the preview on the right — it'll update as Claude creates your files!",
    prompts: {
      portfolio: [
        {
          text: "Create a simple index.html file for a personal portfolio website. Include a header with my name (use a placeholder name), a short bio section, and a footer. Use clean, modern HTML.",
          description: "Claude will create your first HTML file",
        },
      ],
      recipe: [
        {
          text: "Create a simple index.html file for a recipe collection website. Include a header with the site name 'My Recipes', a welcome message, and a footer. Use clean, modern HTML.",
          description: "Claude will create your first HTML file",
        },
      ],
      todo: [
        {
          text: "Create a simple index.html file for a to-do list app. Include a header with the title 'My To-Do List', an input area for adding tasks, and an empty list where tasks will appear. Use clean, modern HTML.",
          description: "Claude will create your first HTML file",
        },
      ],
    },
    tips: [
      "Watch the right panel — your website will appear there as Claude writes the code!",
      "You don't need to understand the code Claude writes. Just focus on what it looks like.",
    ],
    achievement: { id: "creator", title: "Creator", emoji: "🎨" },
  },
  {
    id: 3,
    title: "Add some style",
    description:
      "Your page works, but it looks pretty plain. Let's ask Claude to make it beautiful with colors, fonts, and spacing. This is called CSS — but you don't need to know that, just tell Claude what you want it to look like!",
    prompts: {
      portfolio: [
        {
          text: "Add a styles.css file to make the portfolio look modern and professional. Use a clean sans-serif font, a blue and white color scheme, nice spacing, and subtle shadows. Link it to index.html.",
          description: "Claude will style your portfolio beautifully",
        },
      ],
      recipe: [
        {
          text: "Add a styles.css file to make the recipe site look warm and inviting. Use a cozy color palette with warm oranges and creams, a friendly font, and nice card-like sections. Link it to index.html.",
          description: "Claude will make your recipe site look cozy",
        },
      ],
      todo: [
        {
          text: "Add a styles.css file to make the to-do app look clean and minimal. Use a light background, rounded corners, a modern font, and a satisfying checkbox style. Link it to index.html.",
          description: "Claude will make your to-do app look polished",
        },
      ],
    },
    tips: [
      "Be specific about colors and styles you like — Claude will follow your directions!",
      "If you don't like what Claude made, just tell it: 'I'd prefer different colors' or 'Make the font bigger'.",
    ],
    achievement: { id: "designer", title: "Designer", emoji: "✨" },
    hasBeforeAfter: true,
  },
  {
    id: 4,
    title: "Add real content",
    description:
      "Now let's replace the placeholder text with something more personal. Tell Claude what content you want — be creative!",
    prompts: {
      portfolio: [
        {
          text: "Update the portfolio content: change the name to something fun, write a bio about someone who loves hiking and building things, and add 3 project cards with titles and short descriptions.",
          description: "Claude will fill in your portfolio with content",
        },
      ],
      recipe: [
        {
          text: "Add 3 recipe cards to the page: a classic chocolate chip cookie recipe, a simple pasta dish, and a smoothie. Each should have a title, a short description, prep time, and a list of ingredients.",
          description: "Claude will add delicious recipes to your site",
        },
      ],
      todo: [
        {
          text: "Add 5 example tasks to the to-do list: 'Buy groceries', 'Call mom', 'Finish homework', 'Go for a walk', and 'Read a book'. Make 2 of them already checked off.",
          description: "Claude will populate your to-do list",
        },
      ],
    },
    tips: [
      "You can always tell Claude to change anything — 'Make the bio funnier' or 'Add more recipes'.",
      "The more specific you are, the better the result!",
    ],
  },
  {
    id: 5,
    title: "Build a navigation bar",
    description:
      "Most websites have a navigation bar at the top so visitors can find their way around. Let's ask Claude to add one!",
    prompts: {
      portfolio: [
        {
          text: "Add a navigation bar to the top of the portfolio with links: Home, About, Projects, and Contact. Make it sticky so it stays at the top when scrolling. Style it to match the existing design.",
          description: "Claude will add a navigation bar to your site",
        },
      ],
      recipe: [
        {
          text: "Add a navigation bar with links: Home, Recipes, Favorites, and About. Make it sticky at the top and style it with the warm color scheme to match the rest of the site.",
          description: "Claude will add navigation to your recipe site",
        },
      ],
      todo: [
        {
          text: "Add a simple header bar with the app title on the left and a 'Clear completed' button on the right. Style it to look like a proper app toolbar.",
          description: "Claude will add a toolbar to your app",
        },
      ],
    },
    tips: [
      "A navigation bar helps people move around your site — it's like a table of contents!",
      "If you don't like the style, try: 'Make the nav bar darker' or 'Use a hamburger menu instead'.",
    ],
    hasBeforeAfter: true,
  },
  {
    id: 6,
    title: "Make it interactive",
    description:
      "Websites can do things when you click buttons or type in boxes. Let's add some interactivity — Claude can write the code that makes things happen!",
    prompts: {
      portfolio: [
        {
          text: "Add a dark mode toggle button in the nav bar. When clicked, it should switch the entire page between light and dark themes. Use smooth transitions for the color change.",
          description: "Claude will add a dark/light mode switch",
        },
      ],
      recipe: [
        {
          text: "Make each recipe card clickable — when you click one, it should expand to show the full recipe with ingredients and steps. Click again to collapse it. Add a smooth animation.",
          description: "Claude will make recipe cards expandable",
        },
      ],
      todo: [
        {
          text: "Make the to-do list work! When someone types a task and hits Enter, it should add to the list. Clicking a task should toggle its checkbox. Add a button to delete tasks.",
          description: "Claude will make your to-do list functional",
        },
      ],
    },
    tips: [
      "This is where websites come alive! JavaScript is the language that makes things interactive.",
      "Don't worry about understanding the JavaScript — just tell Claude what you want to happen!",
    ],
    achievement: {
      id: "programmer",
      title: "Programmer",
      emoji: "⚡",
    },
  },
  {
    id: 7,
    title: "Add images and visual flair",
    description:
      "Let's make your site more visually interesting with images, icons, or decorative elements. Claude can add placeholder images that you can swap out later.",
    prompts: {
      portfolio: [
        {
          text: "Add a hero section at the top with a large gradient background and a profile image placeholder (use a colored circle with initials). Add subtle CSS animations like a fade-in effect when the page loads.",
          description: "Claude will add visual flair to your portfolio",
        },
      ],
      recipe: [
        {
          text: "Add colorful emoji icons next to each recipe title (🍪 for cookies, 🍝 for pasta, 🥤 for smoothie). Add a decorative banner at the top with a food-themed gradient background.",
          description: "Claude will make your recipe site more visual",
        },
      ],
      todo: [
        {
          text: "Add emoji categories for tasks (🏠 Home, 💼 Work, 🎯 Personal). Add a fun animation when checking off a task — like a strikethrough with a satisfying fade. Show a celebration emoji when all tasks are done.",
          description: "Claude will add visual polish to your app",
        },
      ],
    },
    tips: [
      "Images and animations make your site feel alive and professional.",
      "You can always say 'Make it more subtle' or 'Make it bolder' to adjust.",
    ],
  },
  {
    id: 8,
    title: "Make it work on phones",
    description:
      "Most people browse the web on their phones, so your site should look great on small screens too. This is called 'responsive design' — let's ask Claude to handle it!",
    prompts: {
      portfolio: [
        {
          text: "Make the portfolio fully responsive. On mobile: stack the project cards vertically, make the nav bar collapsible with a hamburger menu, and increase tap target sizes. Test that it looks good at 375px width.",
          description: "Claude will make your site mobile-friendly",
        },
      ],
      recipe: [
        {
          text: "Make the recipe site responsive for mobile. Stack recipe cards in a single column on small screens, make text sizes comfortable for mobile reading, and ensure the navigation works with touch.",
          description: "Claude will optimize for phones",
        },
      ],
      todo: [
        {
          text: "Make the to-do app mobile-friendly. Ensure the input field and buttons are easy to tap, tasks take full width on small screens, and everything is readable without zooming.",
          description: "Claude will make your app work great on phones",
        },
      ],
    },
    tips: [
      "Try resizing the preview panel to see how your site looks at different sizes!",
      "Responsive design means your site adapts to any screen — phone, tablet, or desktop.",
    ],
    achievement: {
      id: "responsive",
      title: "Mobile Master",
      emoji: "📱",
    },
    hasBeforeAfter: true,
  },
  {
    id: 9,
    title: "Iterate and improve",
    description:
      "Here's the real power of Claude Code — you can just keep talking to it to refine your site. Try asking for changes! This is how real developers work: build, review, improve.",
    prompts: {
      portfolio: [
        {
          text: "I'd like to change the color scheme to something more vibrant — try using purple and gold instead of blue and white. Keep everything else the same.",
          description: "Try changing the visual style",
        },
        {
          text: "Add a smooth scroll effect so clicking nav links scrolls to each section instead of jumping.",
          description: "Add a polished interaction",
        },
      ],
      recipe: [
        {
          text: "Add a search bar at the top that filters recipes as you type. It should hide recipes that don't match the search.",
          description: "Add a useful feature",
        },
        {
          text: "Change the color scheme to a dark green and cream palette — like a natural kitchen feel.",
          description: "Try a different look",
        },
      ],
      todo: [
        {
          text: "Add a filter bar with buttons: All, Active, Completed. Clicking each should show only those tasks.",
          description: "Add filtering functionality",
        },
        {
          text: "Add a task counter that shows 'X tasks remaining' at the bottom.",
          description: "Add a useful detail",
        },
      ],
    },
    tips: [
      "This is the magic — just describe what you want changed and Claude handles the rest!",
      "Try being conversational: 'I don't love the font, can you try something more playful?'",
      "If Claude changes something you liked, say: 'Undo that last change' or 'Keep the header but change the footer'.",
    ],
  },
  {
    id: 10,
    title: "Add a special feature",
    description:
      "Let's add something that makes your site unique. Pick one of these prompts or come up with your own idea!",
    prompts: {
      portfolio: [
        {
          text: "Add a contact form with name, email, and message fields. Style it nicely and add form validation — show a friendly error if someone tries to submit without filling everything in.",
          description: "Add a contact form",
        },
        {
          text: "Add a testimonials section with 3 quote cards that auto-rotate with a fade animation every 5 seconds.",
          description: "Add rotating testimonials",
        },
      ],
      recipe: [
        {
          text: "Add a 'favorite' button (heart icon) to each recipe. When clicked, it turns red and the recipe gets added to a favorites section at the top of the page.",
          description: "Add a favorites feature",
        },
        {
          text: "Add a serving size adjuster to each recipe — a plus/minus control that recalculates ingredient quantities.",
          description: "Add smart serving sizes",
        },
      ],
      todo: [
        {
          text: "Add drag-and-drop to reorder tasks. When you drag a task to a new position, it should stay there.",
          description: "Add drag and drop",
        },
        {
          text: "Add due dates to tasks with a date picker. Tasks past their due date should turn red.",
          description: "Add due dates",
        },
      ],
    },
    tips: [
      "This is YOUR website — add whatever feature sounds cool to you!",
      "You're not limited to these suggestions. Try asking for anything you can imagine.",
    ],
    achievement: {
      id: "innovator",
      title: "Innovator",
      emoji: "💡",
    },
  },
  {
    id: 11,
    title: "Polish and perfect",
    description:
      "Time for the finishing touches! Let's add the little details that make a website feel complete and professional.",
    prompts: {
      portfolio: [
        {
          text: "Add finishing touches: a favicon (use an emoji as favicon), smooth page transitions, a loading animation, and make sure all the spacing and alignment looks perfect.",
          description: "Claude will add professional finishing touches",
        },
      ],
      recipe: [
        {
          text: "Add finishing touches: a favicon with a fork-and-knife emoji, a 'back to top' button that appears when scrolling down, and make sure all recipe cards are perfectly aligned.",
          description: "Claude will polish your recipe site",
        },
      ],
      todo: [
        {
          text: "Add finishing touches: save tasks to localStorage so they survive page refresh, add a satisfying confetti animation when all tasks are completed, and polish all the spacing.",
          description: "Claude will perfect your to-do app",
        },
      ],
    },
    tips: [
      "The little details are what separate good websites from great ones.",
      "A favicon is the small icon that appears in browser tabs — it's a nice touch!",
    ],
  },
  {
    id: 12,
    title: "You did it!",
    description:
      "Congratulations — you just built a real website using AI! You learned how to talk to Claude Code, iterate on designs, and create something from nothing. The files Claude created are saved in your htcgf-workspace folder. From here, you could host this on the internet for the whole world to see!",
    prompts: {
      portfolio: [
        {
          text: "Give me a summary of all the files you created and what each one does. Then tell me how I could put this website on the internet for free.",
          description: "Learn what was built and how to share it",
        },
      ],
      recipe: [
        {
          text: "Give me a summary of all the files you created and what each one does. Then tell me how I could put this website on the internet for free.",
          description: "Learn what was built and how to share it",
        },
      ],
      todo: [
        {
          text: "Give me a summary of all the files you created and what each one does. Then tell me how I could put this website on the internet for free.",
          description: "Learn what was built and how to share it",
        },
      ],
    },
    tips: [
      "Your files are in the ~/htcgf-workspace folder — they're real files you can keep!",
      "You can keep talking to Claude to add more features anytime.",
      "Try building something completely new next time!",
    ],
    achievement: { id: "shipped", title: "Shipped!", emoji: "🚀" },
    hasBeforeAfter: true,
  },
];

export const TOTAL_STEPS = STEPS.length;
