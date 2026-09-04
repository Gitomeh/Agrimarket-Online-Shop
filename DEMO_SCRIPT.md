# AgriMarket Demo Recording Script

## Target Duration: 4 minutes

## 0:00–0:30 — Introduction

**Narration:**
"Welcome to AgriMarket, an AI-powered agricultural marketplace that connects buyers with local farmers while providing intelligent market insights. The platform solves a key problem in agricultural commerce: the lack of real-time market intelligence that makes it difficult for buyers to make informed purchasing decisions and for farmers to optimize their pricing."

**Visual:**
- Show the application homepage
- Navigate through the main sections briefly

**Key Points:**
- What AgriMarket is
- The problem it solves (lack of market intelligence)
- Who it helps (buyers, farmers, market analysts)

---

## 0:30–1:00 — Show the Application

**Narration:**
"Let me show you the application interface. The homepage displays a marketplace of agricultural products from local farmers. Each product card shows the item name, farmer, price, rating, and availability. Users can browse products, view farmer profiles, and add items to their cart. The clean, responsive design works seamlessly on both desktop and mobile devices."

**Visual:**
- Scroll through the homepage marketplace
- Show product cards with details
- Briefly show the navigation (Home, Farmers, About)
- Demonstrate clicking on a product to view details

**Key Points:**
- Clean, modern interface
- Product discovery functionality
- Farmer information and ratings
- Responsive design

---

## 1:00–2:30 — Live End-to-End Run

**Narration:**
"Now let me demonstrate the core AI capability. I'll select this Organic Tomatoes from Green Valley Farm and run a market analysis. When I click on the product, I can see detailed information including the current price of $4.99 per pound, product description, and farmer details."

**Visual:**
- Click on "Organic Tomatoes" product
- Show product detail page
- Scroll down to "AI Market Insights" section
- Click "Analyze Market" button

**Narration:**
"Down here is the AI Market Insights section. When I click 'Analyze Market', the AI agent processes the product information and provides comprehensive market intelligence. The system is now analyzing the market trends for Organic Tomatoes at the current price point."

**Visual:**
- Show loading state with "Analyzing..." animation
- Wait for analysis to complete (1-2 seconds)

**Narration:**
"The analysis is complete. The agent shows a 'rising' trend with 87% confidence, indicating that prices are expected to increase. The price forecast shows a potential increase to $5.24 per pound, about a 5% rise. The key factors identified include seasonal demand patterns, local supply conditions, and weather impact on harvest."

**Visual:**
- Show the complete analysis results
- Highlight the trend indicator, confidence score, and price forecast
- Point out the key factors list

**Narration:**
"Most importantly, the agent provides a clear recommendation: 'Good time to buy - prices expected to increase soon.' This helps users make informed purchasing decisions based on real-time market intelligence."

**Visual:**
- Highlight the recommendation section
- Show the agent reasoning text that explains the analysis

**Key Points:**
- Complete user workflow from product selection to AI analysis
- Real-time AI processing
- Structured, actionable results
- Clear recommendations for decision-making

---

## 2:30–3:15 — Explain One Design Decision

**Narration:**
"One design decision I made was implementing a multi-layered guardrail system before the LLM execution, rather than relying solely on post-processing validation. This means the agent validates inputs like price thresholds, product categories, and availability before making any API calls to the language model."

**Visual:**
- Could briefly show the code structure or a diagram
- Keep focus on the application interface

**Narration:**
"I chose this approach for three key reasons: First, it prevents unnecessary API costs by filtering invalid requests upfront. Second, it provides better user experience with immediate feedback rather than making users wait for API responses. Third, it ensures system reliability by maintaining consistent behavior regardless of LLM output quality. This safety-first approach is crucial for a production application dealing with financial recommendations."

**Key Points:**
- Explicit statement: "One design decision I made was..."
- The decision: Multi-layered guardrails before LLM execution
- The reasoning: Cost efficiency, UX, reliability
- Trade-offs acknowledged: Additional validation logic

---

## 3:15–3:45 — Demonstrate a Guardrail/Limitation

**Narration:**
"One limitation of the current version is that the agent will not analyze products with prices outside the agricultural range. Let me demonstrate this by trying to analyze a product with an unrealistically high price."

**Visual:**
- Navigate to a product or create a test scenario
- Try to trigger the price guardrail
- Show the error message and guardrail trigger

**Narration:**
"If I were to try analyzing a product priced at $2000, the agent's guardrail system immediately rejects this request. The system shows that the 'price_too_high' guardrail was triggered, preventing analysis of items that don't fit within typical agricultural product pricing. This protects users from potentially misleading analysis on items outside the agent's training domain."

**Visual:**
- Show the guardrail error message
- Highlight the specific guardrail that was triggered
- Show the clear error explanation

**Key Points:**
- Explicit statement: "One limitation of the current version is..."
- The limitation: Price range guardrails
- Demonstration: Actual guardrail triggering
- User benefit: Protection from misleading analysis

---

## 3:45–4:15 — Evaluation

**Narration:**
"The agent has been thoroughly evaluated with a comprehensive test suite. The v2 evaluation includes 11 automated tests covering guardrail effectiveness, market analysis capabilities, error handling, and response quality. All tests passed with a 100% pass rate."

**Visual:**
- Show the test results summary
- Could show the test file or run results

**Narration:**
"The evaluation tested critical scenarios including price validation, category support, availability checks, response structure validation, and reasoning quality. This ensures the agent operates reliably within its designed parameters and provides consistent, accurate market intelligence."

**Visual:**
- Highlight specific test categories and their results
- Show the pass/fail breakdown

**Key Points:**
- Number of tests: 11 automated tests
- Pass rate: 100%
- What was tested: Guardrails, analysis, error handling, response quality
- No critical failures identified

---

## 4:15–4:30 — Closing

**Narration:**
"AgriMarket demonstrates how AI agents can enhance traditional marketplaces by providing intelligent, actionable insights while maintaining safety through robust guardrails. The combination of modern React architecture, structured agent workflows, and comprehensive evaluation creates a reliable platform for agricultural commerce. Thank you for watching this demonstration of AgriMarket."

**Visual:**
- Show the application homepage one final time
- Could show the agent architecture diagram
- End with a clean view of the application

**Key Points:**
- Brief summary of the project
- Key achievements (AI + safety + evaluation)
- Professional closing

---

## Recording Notes

### Technical Setup
- Use screen recording software (OBS, Loom, etc.)
- Record at 1080p or higher resolution
- Ensure browser window is large enough to read text
- Use good microphone quality for clear narration

### Performance Tips
- Practice the script a few times before recording
- Keep mouse movements smooth and deliberate
- Allow slight pauses after key actions for viewer comprehension
- Speak clearly and at a moderate pace

### Backup Plan
- If analysis takes longer than expected, have a pre-recorded version ready
- If demo environment has issues, be prepared to explain concepts verbally
- Keep a copy of the evaluation results handy to show if live demo fails

### Timing Adjustments
- If running short: Expand on the design decision explanation
- If running long: Shorten the application tour section
- Target exactly 4 minutes for optimal pacing