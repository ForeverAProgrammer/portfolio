---
slug: four-questions-every-developer-should-ask
title: "Four Questions to Ask Before Writing Code"
authors: [kristina-haynes]
tags: [software-engineering, best-practices, technical-debt, decision-making, architecture]
---

# Four Questions to Ask Before Writing Code

Evaluating code decisions before implementation helps prevent technical debt and costly mistakes. This post outlines a practical framework for assessing feature requests and architectural decisions by considering benefits, effort, risks, and long-term maintainability.

<!--truncate-->

## The Problem: When "Just Code It" Goes Wrong

Early in my career, I was the developer who said "yes" to everything. Someone wanted a feature? I'd build it. Manager suggested a "quick improvement"? Already on it. The result? A codebase full of half-baked features, technical debt, and solutions looking for problems.

The turning point came when I watched a client lose **hundreds of thousands of dollars** because of what seemed like a simple architectural decision. They designed two critical applications to share the same database "for convenience." When that database locked up, both applications went down simultaneously, causing them to miss a regulatory deadline. The fine was devastating.

That incident taught me a crucial lesson: **every code decision has consequences that ripple far beyond the immediate implementation**.

## The Four-Question Framework

Before I write code—or even agree to a request—I run it through these four questions:

1. **What's the benefit?**
2. **What's the effort?**
3. **What's the risk?**
4. **How will this work with future changes?**

Let's break down each one.

## Question 1: What's the Benefit?

This seems obvious, but most developers skip the deep analysis. Don't just ask "what does this do?"—dig deeper.

### Key Sub-Questions

**Performance Impact:**
- Will this improve performance? By how much?
- Could it decrease performance?
- Have we measured the current performance to know if this matters?

**User Impact:**
- Will users notice this change?
- Does it solve a real user problem or just a theoretical one?
- What's the user's current workaround, and how painful is it?

**Code Quality:**
- Will this make the code easier or harder to maintain?
- Does it reduce technical debt or increase it?
- Will future developers thank you or curse you?

**Security:**
- Does this make the application more secure or less secure?
- Are we introducing new attack vectors?
- Does it meet our security compliance requirements?

**Business Value:**
- What's the ROI? (Revenue increase? Cost reduction? Risk mitigation?)
- Does this align with business priorities?
- What's the opportunity cost of building this instead of something else?

### Real Example: The Pretty UI Trap

I once worked on a legacy ASP.NET Web Forms application using the AJAX Control Toolkit. A stakeholder requested we add jQuery UI tabs to make the interface "look more modern."

**Initial thought:** "Sure, jQuery tabs are easy!"

**After asking 'What's the benefit?':**
- **Performance:** Actually worse. Each AJAX partial postback would wipe out JavaScript state, requiring re-initialization
- **User impact:** Users didn't complain about the current UI
- **Maintenance:** Would require complex workarounds to maintain state across postbacks
- **Business value:** Zero. Purely cosmetic change to a system scheduled for replacement

**Decision:** Declined the request. Suggested focusing on the planned migration to modern framework instead.

**Outcome:** Saved 2-3 weeks of development on a feature that would have created more problems than it solved.

### Warning: The "Small Benefit" Trap

Beware of changes with small benefits but high hidden costs:

```
Small Benefit + High Effort = Bad Decision
Small Benefit + High Risk = Bad Decision
Small Benefit + Technical Debt = Bad Decision
```

Just because you *can* build something doesn't mean you *should*.

## Question 2: What's the Effort?

Effort estimation isn't just about time—it's about understanding the full scope of impact.

### Key Sub-Questions

**Scope of Change:**
- How many files will I need to modify?
- How many lines of code will change?
- How many systems/applications are affected?
- Are we touching critical code paths?

**Dependencies:**
- Do I need other teams to make changes?
- Are there infrastructure changes required?
- Do I need access to production systems?
- Will this require coordinating multiple deployments?

**Testing Requirements:**
- What's the testing scope?
- Do we need to involve QA?
- Are there regression testing concerns?
- Do we need performance testing?

**Knowledge Gaps:**
- Do I understand the existing code well enough?
- Will I need to learn new technologies?
- Do I need domain expertise I don't have?

### Real Example: The "Simple" Database Change

**Request:** "Just add a new field to track customer preferences."

**After asking 'What's the effort?':**

**Direct changes:**
- Database schema update
- 3 API endpoints
- 5 UI screens
- Data migration script

**Hidden effort:**
- **12 applications** reading from this table (not just 1!)
- Database replication to 3 different systems
- ETL processes that need updating
- 50+ automated tests to update
- Documentation across 4 wikis
- Notification to 3 other teams

**Estimated:** 2 hours → **Actual:** 40+ hours

**Lesson:** Always map the full dependency tree before committing.

### The Multiplier Effect

When estimating effort, consider these multipliers:

| Factor | Multiplier | Why |
|--------|-----------|-----|
| Legacy codebase | 2-3x | No tests, poor docs, brittle code |
| Cross-team dependencies | 2x | Coordination overhead |
| Production data migration | 3x | Testing, rollback plans, monitoring |
| Security-sensitive changes | 2x | Extra review, pentesting, compliance |
| "Critical" systems | 2x | Extra caution, more thorough testing |

## Question 3: What's the Risk?

This is where many developers fail to think critically. We focus on the happy path and ignore Murphy's Law.

### Key Sub-Questions

**Technical Risk:**
- What's the worst that can happen if this fails?
- Can it bring down the entire system or just a feature?
- Is the failure obvious or subtle?
- Can we roll back easily?

**Business Risk:**
- How much money could the company lose?
- Could this cause regulatory violations?
- What's the reputational risk?
- Are there legal implications?

**Data Risk:**
- Could we lose data?
- Could data be corrupted?
- Is there a privacy/security exposure?
- Can we recover from data issues?

**Operational Risk:**
- Will this require 24/7 monitoring?
- Do we have the expertise to support this?
- What happens if the primary developer leaves?

### Real Example: The Shared Database Disaster

I mentioned this earlier, but it's worth examining in detail because it perfectly illustrates risk analysis failure.

**Decision:** Share a database between two critical applications

**Perceived benefits:**
- Easy data sharing
- No need for APIs or data sync
- "Simpler" architecture

**After asking 'What's the risk?':**

**What they considered:**
- Database performance (added indexes, seemed fine)

**What they DIDN'T consider:**
- **Single point of failure** - one database crash takes down TWO applications
- **Coupling** - schema changes in one app can break the other
- **Lock contention** - long-running queries in one app lock tables for the other
- **Deployment complexity** - can't deploy apps independently
- **Scaling limitations** - can't scale databases independently
- **Blast radius** - a bug in one app's query can kill performance for both

**What actually happened:**
1. Application A had a bad query that locked the database
2. Application B couldn't process transactions
3. Missed a critical regulatory deadline
4. **Fine: $500,000+**
5. Emergency weekend to separate the databases

**Lesson:** When the risk is "total system failure," the architecture is wrong—no matter how convenient it seems.

### Risk Matrix

Use this matrix to evaluate decisions:

```
         Low Impact          High Impact
       ┌──────────────┬──────────────┐
Low    │   PROCEED    │   CAREFUL    │
Risk   │   Quickly    │   Planning   │
       ├──────────────┼──────────────┤
High   │   CAREFUL    │   AVOID OR   │
Risk   │   Planning   │   REDESIGN   │
       └──────────────┴──────────────┘
```

**Avoid or Redesign Zone Examples:**
- Sharing databases between critical systems
- Storing passwords in plain text
- "Big bang" migrations
- Single points of failure in critical paths
- Irreversible data transformations

## Question 4: How Will This Work With Future Changes?

This is about future-proofing without over-engineering. The goal is flexibility, not building features you don't need yet.

### Key Sub-Questions

**Extensibility:**
- How hard will it be to add similar features later?
- Are we hardcoding assumptions that will change?
- Does this support the roadmap?

**Maintainability:**
- Will new developers understand this?
- Is it consistent with our existing patterns?
- Does it follow our coding standards?

**Compatibility:**
- Will this work with planned changes/projects?
- Does it align with our architecture direction?
- Are we painting ourselves into a corner?

**Data-Driven vs. Hardcoded:**
- Should this be configurable instead of hardcoded?
- Will this require code changes every time values change?
- Can business users manage this themselves?

### Real Example: The Multi-Part Solution

**Context:** Building a system to track machine parts. Currently using only one part number.

**Temptation:** Hardcode the part number

```csharp
// ❌ Bad: Hardcoded
public class Machine
{
    private const string PART_NUMBER = "ABC-123";

    public Part GetPart()
    {
        return partRepository.GetByPartNumber(PART_NUMBER);
    }
}
```

**After asking 'How will this work with future changes?':**

**Considerations:**
- Will we always use just one part? (Probably not)
- What happens when we want to test a new part?
- Do we want to require a code change and deployment for part changes?

**Better solution:** Make it data-driven

```csharp
// ✅ Good: Data-driven
public class Machine
{
    public int MachineId { get; set; }
    public List<Part> Parts { get; set; }

    public Machine(int machineId, IPartRepository partRepository)
    {
        MachineId = machineId;
        // Load parts from database configuration
        Parts = partRepository.GetPartsByMachineId(machineId);
    }
}
```

**Database:**
```sql
CREATE TABLE MachineParts (
    MachineId INT,
    PartNumber VARCHAR(50),
    PRIMARY KEY (MachineId, PartNumber)
);
```

**Outcome:**
- 6 months later: Business wanted to test a new part
- **Solution:** Added one database row. Zero code changes. Zero deployment.
- Time saved: 2-3 days of development + testing + deployment

**ROI:** 30 minutes of upfront thinking saved weeks of future work.

### The Balance: Future-Proofing vs. Over-Engineering

**❌ Over-Engineering:**
```csharp
// Building a plugin architecture for a feature used once
public interface IPartValidator { }
public class DefaultPartValidator : IPartValidator { }
public class PluginPartValidatorLoader { }
public class PartValidatorFactory { }
// ... 500 lines of abstraction for 10 lines of logic
```

**✅ Good Future-Proofing:**
```csharp
// Making values configurable instead of hardcoded
public class PartConfiguration
{
    public List<string> ValidPartNumbers { get; set; }
    public int MaxPartsPerMachine { get; set; }

    // Load from config file or database
    public static PartConfiguration Load() { }
}
```

**Rule of thumb:**
- If you're adding it "because we might need it someday" → Over-engineering
- If you're making existing requirements flexible → Good future-proofing

## Putting It All Together: Real Decision Examples

### Example 1: Database Index Addition

**Request:** "Add index to speed up slow query"

**Question 1 - Benefit:**
- ✅ Query runs in 15s, index would reduce to &lt;1s
- ✅ Query runs 10,000 times per day
- ✅ Saving 140,000 seconds per day = huge impact

**Question 2 - Effort:**
- Create index (5 minutes)
- Test in staging (30 minutes)
- Deploy to production (10 minutes)
- Estimated: 1 hour

**Question 3 - Risk:**
- ⚠️ Indexes slow down writes
- ✅ But this table is read-heavy (99% reads)
- ⚠️ Index creation locks table
- ✅ Can create online (no lock)
- Low risk overall

**Question 4 - Future:**
- ✅ No negative impact on future changes
- ✅ Improves system scalability

**Decision:** Absolutely do this! High benefit, low effort, low risk, no future complications.

### Example 2: Microservices Migration

**Request:** "Migrate monolith to microservices"

**Question 1 - Benefit:**
- ✅ Better scalability (maybe—if we have scale issues)
- ✅ Independent deployments (nice to have)
- ✅ Technology diversity (do we want this?)
- ⚠️ Current system handles load fine
- ⚠️ Team has limited distributed systems experience

**Question 2 - Effort:**
- 6-12 months of development
- Completely rewrite application
- New infrastructure (Kubernetes, service mesh, etc.)
- Retrain entire team
- Massive effort

**Question 3 - Risk:**
- ❌ Distributed systems are complex
- ❌ New failure modes (network, partial failures)
- ❌ Data consistency challenges
- ❌ Team lacks experience
- ❌ Operational complexity 10x higher
- Very high risk

**Question 4 - Future:**
- ✅ Easier to scale individual services
- ❌ Much harder to refactor across services
- ❌ Harder to onboard new developers
- ❌ Harder to debug issues

**Decision:** Declined. This is a solution looking for a problem. Current architecture handles our needs. If we hit actual scale issues, we can scale the monolith or extract specific services strategically.

## When to Say No

The four-question framework often leads to saying "no"—and that's okay. Here's when to push back:

### Red Flags

🚩 **High effort, low benefit**
- Example: Rewriting working code for "cleanliness"

🚩 **High risk, low benefit**
- Example: Changing database engines because it's "cool"

🚩 **Creates future technical debt**
- Example: Quick hacks that "we'll fix later" (you won't)

🚩 **Solves a problem that doesn't exist**
- Example: Building for scale you'll never reach

🚩 **Violates security best practices**
- Example: Storing passwords in plain text "temporarily"

🚩 **Creates single points of failure**
- Example: Shared databases between critical systems

### How to Say No (Professionally)

**❌ Bad:**
"That's a terrible idea."

**✅ Good:**
"I've analyzed this using our risk/benefit framework. While I understand the benefit, I'm concerned about [specific risks]. Have we considered [alternative approach]?"

**Template:**
1. Acknowledge the request's intent
2. Share your analysis (benefit, effort, risk, future)
3. Present alternatives or conditions
4. Ask for their input

**Example:**
> "I understand we want to improve the user experience with jQuery tabs. I've analyzed this and I'm concerned about several issues:
>
> **Effort:** Due to AJAX Control Toolkit postback behavior, we'd need significant workarounds (~2-3 weeks)
>
> **Risk:** Each postback would require state re-initialization, creating potential bugs
>
> **Alternative:** Since we're planning to migrate to React next quarter, could we include improved UI as part of that migration? This would give us a better result with less throwaway work."

## Common Mistakes to Avoid

### 1. Skipping the Questions for "Simple" Changes

**Mistake:** "It's just changing a config value, what could go wrong?"

**Reality:** That "simple" config change:
- Was referenced in 15 places
- Had undocumented dependencies
- Broke a critical integration
- Required emergency rollback

**Lesson:** Run ALL changes through the framework, no matter how "simple."

### 2. Letting "Perfect" Become the Enemy of "Good Enough"

**Mistake:** Spending weeks building the "perfect" solution for a problem that needed a quick fix.

**Reality:**
- The business needed a solution in days, not weeks
- Your perfect solution addressed problems that don't exist
- Opportunity cost was huge

**Lesson:** The framework helps you balance thoroughness with pragmatism. Sometimes "good enough now" beats "perfect later."

### 3. Ignoring Operational Costs

**Mistake:** "It works in dev, ship it!"

**Reality:**
- Requires 24/7 monitoring
- Needs specialized knowledge to debug
- Creates on-call burden
- Costs more to operate than the value it provides

**Lesson:** Always ask "who will maintain this at 2 AM?"

### 4. Building for Hypothetical Future Requirements

**Mistake:** "We might need this someday, so let's build it now."

**Reality:**
- YAGNI (You Aren't Gonna Need It) is usually right
- Requirements change
- Wasted effort on features never used

**Lesson:** Build for today's requirements, design for tomorrow's flexibility.

### 5. Underestimating Risk Because "It Worked in Dev"

**Mistake:** "It passed all our tests, what could go wrong in production?"

**Reality:**
- Production has 10,000x the data
- Production has real users doing unexpected things
- Production has years of technical debt
- Production never works exactly like dev

**Lesson:** Always ask "what's different about production?"

## The Meta-Question: Should I Even Build This?

Sometimes the framework reveals the uncomfortable truth: **this entire project shouldn't exist**.

### Projects I've Declined Using This Framework

1. **Rewrite Cypress Plugin from JavaScript to TypeScript**
   - High effort (complex rewrite), minimal benefit, high risk of breaking existing functionality
   - The plugin worked fine in newer versions of Cypress without conversion
   - Just because TypeScript is trendy doesn't mean every working JavaScript needs rewriting

2. **Add jQuery UI tabs to legacy ASP.NET Web Forms application**
   - High effort (2-3 weeks of workarounds for AJAX postback state management)
   - Zero benefit (purely cosmetic, users weren't complaining)
   - System was already scheduled for migration to modern framework
   - Detailed example covered earlier in this post

3. **Create yet another internal tool**
   - We already had 3 similar tools
   - Benefit was "convenience," cost was fragmentation

4. **"Future-proof" architecture for scale we'll never reach**
   - Optimizing for 1M users when we had 1,000
   - Unnecessary complexity

5. **Shared database between critical systems**
   - As we discussed—huge risk, medium benefit
   - Single point of failure is never worth the convenience

## The Framework in Practice: A Checklist

Use this checklist before starting any significant work:

### Benefit Analysis
- [ ] What specific problem does this solve?
- [ ] Have we measured the current pain point?
- [ ] What's the quantifiable improvement?
- [ ] Will users notice/care?
- [ ] Does this align with business priorities?
- [ ] What's the opportunity cost?

### Effort Analysis
- [ ] How many files/systems affected?
- [ ] What's the realistic timeline?
- [ ] What dependencies exist?
- [ ] What knowledge gaps do I have?
- [ ] What's the testing scope?
- [ ] Who else needs to be involved?

### Risk Analysis
- [ ] What's the worst-case scenario?
- [ ] What's the blast radius if this fails?
- [ ] Can we roll back easily?
- [ ] What's the business impact of failure?
- [ ] What's the regulatory/legal risk?
- [ ] Do we have monitoring/alerting for failures?

### Future Analysis
- [ ] Does this support the roadmap?
- [ ] Will this make future changes easier or harder?
- [ ] Are we hardcoding things that should be configurable?
- [ ] Is this compatible with planned changes?
- [ ] Will this create technical debt?
- [ ] Would we make this decision again in 6 months?

**Decision Rule:**
- 3-4 categories positive → Likely proceed
- 2 categories positive → Needs redesign or alternatives
- 0-1 categories positive → Say no

## Conclusion

The four-question framework has saved me from:
- Countless hours of wasted work
- Multiple production disasters
- Technical debt nightmares
- Political battles over bad projects

But more importantly, it's helped me:
- **Build better software** by thinking critically
- **Say no confidently** with data, not opinion
- **Prioritize effectively** based on real impact
- **Communicate better** with non-technical stakeholders

Every "no" saved time for meaningful work. Every "yes" was well-justified and successful. Every decision was defendable with clear reasoning.

## Your Turn

Next time you're about to write code, pause and ask:

1. **What's the benefit?** (Measure it)
2. **What's the effort?** (Include hidden costs)
3. **What's the risk?** (Think worst-case)
4. **How will this work with future changes?** (Don't paint yourself into corners)

These four questions will save you from disasters I wish I'd avoided earlier in my career.

## Critical Analysis: Issues with the Original Content

While reflecting on my framework, I should note some potential concerns:

### Potential Over-Analysis Paralysis

**Issue:** Following this religiously could lead to analysis paralysis.

**Balance:** Use proportional analysis:
- 5-minute change? 5-minute analysis
- 5-week project? Multi-day analysis
- Not everything needs a formal risk matrix

### The "Perfect Code" Trap

**Issue:** The original text mentions "always wanting to create perfect code."

**Reality:** Perfect code doesn't exist. The framework helps you find "good enough," not perfect. Don't let analysis prevent shipping.

### Context Matters

**Issue:** These questions work great for established systems but might be overkill for:
- Prototypes
- Proof of concepts
- Learning projects
- Throwaway code

**Nuance:** Adjust the depth of analysis to the context.

## Resources

- **[YAGNI Principle](https://martinfowler.com/bliki/Yagni.html)** - You Aren't Gonna Need It
- **[Technical Debt Quadrant](https://martinfowler.com/bliki/TechnicalDebtQuadrant.html)** - Understanding debt types
- **[Risk-Driven Development](https://www.amazon.com/Risk-Driven-Software-Architecture-Adam-Trendowicz/dp/0321674340)** - Architecture decisions

---

*Remember: The best code is sometimes the code you don't write.*
