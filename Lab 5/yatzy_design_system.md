# Yahtzee Game Design Documentation

Yahtzee is a popular dice game played among friends and family, developed in 1956 and made by Milton Bradley.

---

#### Game Overview/Rules  
  
The goal of the game is to achieve the highest score possible. Players will roll up to 5 dice at a time. You also have the option to choose how many dice you roll in a round. The number of points earned in a round depends on how many dice land on the same number. Here are all of the different scoring combinations:  

One Pair - The score is the sum of the two identical dice  
Two Pairs - The score is the sum of each pair added with each other  
Three of a Kind - The score is the sum of the identical dice  
Four of a Kind - The score is the sum of the identical dice  
Small Straight - The score is the sum of 1 through 5 dice values which is 15  
Large Straight - The score is the sum of 2 through 6 dice values which is 20  
Full House -  Consists of three dice showing one number and two dice showing another number.
Chance -  is a more flexible category in Yatzy. It allows you to sum up the total of all five dice, regardless of their values.
Yatzy - The score is 50 points (all 5 dice need to have the same number)

### 1. Typography

**Primary Font**: Use a clean and easily readable font for the entire game design. The font family used is 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial  Black, sans-serif. Example: Arial, Helvetica, or a similar sans-serif font.

**Font Sizes**:
- **Heading 1**: 23px
- **Heading 2**: 18px
- **Navigation Links**: 15.5px

**Font Colors**:
- **Main Text**: #000000
- **Links**: #FFEC33

---

### 2. Color Palette

We chose to use a simple variation in colors. The reason for this choice is to keep a consistent theme of our game. We purposefully matched the black and white colors with the game dice to create a more immersive feel of the game.

**Primary Color**: #FFFFFF (Used for links and accents)

**Background Color**: #FFFFFF (Used for the overall page background)

**Text Color**: #000000 (Used for most text content)

**Secondary Colors**: Use complementary colors sparingly for accents, such as buttons or highlights.

---

### 3. Layout

- **Container**: Keep content within a centered container with a maximum width of 800px.
- **Margins and Padding**: Use appropriate margins and padding to create visual separation and improve readability.
- **Box Shadow**: Apply a subtle box shadow to the container for a subtle depth effect.
---

### 4. Buttons

- **Button Style**: Use a simple, flat design for buttons (includes button hover)
- **Background**: Primary Color (#FFFFFF)
- **Text Color**: Black (#000000)
- **Padding**: 1rem 3rem
- **Border**: None
- **Border-Radius**: 50px
- **Cursor**: pointer

---

### 5. Headings

- **Heading 1**: 24px, Bold, #333333
- **Heading 2**: 18px, Bold, #333333

---

### 6. Paragraphs

- **Font**: 16px, Regular, #333333
- **Line Spacing**: 1.5
- **Margin**: Appropriate spacing at the top and bottom of paragraphs for readability.
---

### 7. Links

- **Normal Links**: #007BFF
- **Hover Links**: #0056b3
- **Visited Links**: #7D3C98
- **Underline**: None (unless on hover)
---

### 8. Images

- **Image Sizing**: Optimize and maintain aspect ratios for images to prevent distortion.
- **Image Alignment**: Centered on the right where appropriate.
- **Dice Animation-gif**: used to design the page on the right-center.
---
### 9. Dice Design

The dice used in our yatzy game have a traditional look to them. They are generated in a 2D format. We chose to keep it this way since it matches well with the theme of our game. A screenshot of the dice sketch is posted in the lab 5 branch.



### 10. Game Mock-ups  
  
Screenshots of the game components are posted in the lab 5 branch.  
  
### 11. Additional Documentation  
  
We chose to implement a 3D animation into our dice rolling. Code Sandbox influenced this choice. The logic includes CSS to rotate the dice to a certain degrees and also creates the spinning animation. The flow of the game includes pressing a throw dice button which starts the animation. The information is then updated to the game tables. There are also options to restart or leave the current game. The reason for these choices is to keep the game design simple but also mixing it with a few more complex features such as the 3D animation.
