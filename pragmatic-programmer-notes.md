# Personal notes from the Pragmatic Programmer (from 2021)

## Chapter 1

- taking responsibly for your own career growth vs blaming company or others
- Team trust to get shit done
- Job to provide options and solutions not excuses/not possible - share what would need to happen to achieve it (compromises)
- Don’t sound like making a lame excuse (cat ate my code)
- Broken windows - leaving things/low standards/not replying 
- Take some action to prevent further damage (comment, board up)
- Don’t cause more damage when crisis occurs - not worth the broken window 
- What broken windows do we have? (Site alert, alert emails)

- “start up fatigue” - stone soup, trick people into getting where you want, figure what you can get easily. Pretend not important and see them add stuff (SSO upgrade)

- good enough software - users participate in when something is good enough (feedback/trade offs)- esp for brand new product. Better for good software today than perfect tomorrow 
- Know when to stop - may not be perfect
- Modular software released at different times (building blocks vs monolith)
- Who in the team does this?

- ability to learn is our most important strategic asset
- Invest Knowledge portfolio (diverse, invest regularly, mix of risky and low risk, reviewed, a habit)

- all our job is communication of ideas (people, machines) need to be effective 
- Talking not always communicating 
- Gather feedback by asking vs waiting
- Write outline - then ask does this communicate to the audience and work for them 
- Make it look good, presentation matters
- Involve readers in early drafts - better working relationship 
- Listen to people if you want them to listen to you
- Embrace documentation (even if the code) - you’re writing code to be read by someone later, not for you now 
- Documenting WHY of code is more important than WHAT/HOW 

## Chapter 2 - pragmatic approach and Essence of good design

- good designer easier to change than bad design - adapts to the people who use it 
- Note when you make a decision and revisit in future to see how easy it was to change 

### DRY
- Knowledge isn’t stable (laws, requirements)
- Every piece of knowledge must have a single, authoritative representation in a system
- DRY about knowledge - not code/how
- Code can be the same, but representing different knowledge (example of validating age and quantity - same logic but diff idea) - don’t couple them 
- Documentation shouldn’t duplicate the knowledge represented in the code - have to update both in lockstep
- If need to cache data unDRY, localise the impact (don’t expose to outside world)
- Uniform notation - services offered by module don’t say if they are computed or stored 
- For external data - don’t represent in a fixed structure (struct) but generic key value map - then validate the map has at least what you need/right format 
- In teams - frequent and active communication - forums, meetings, central repos for info

### Orthogonality
- Independent but touching lines
- Changes in one don’t affect another 
- Helicopter example of secondary effects - big workload, hard to control 
- Design indepdant things with well defined purposes 
- Faster to develop and maintain, promotes reuse, reduces risk/sick systems, less fragile, better tested
- Modular, component based, layered 
- Don’t rely on properties of things you don’t control (emails, phone number, addresses, domains)
- Adding new toolkits should be orthogonal - details isolated to a single system 
- If want to change object state, get the object to do it
- Write SHY code - doesn’t want to show itself to others
- Pass context to modules vs global state
- Unit tests can be test for orthogonal code - how much do you need to mock to run it

### Reversibility 
- eng prefer simple and single solutions vs real life everything changes, can’t solve one way. 
- Never think there is only one way to do something 
- With every decision, team commits to smaller target - narrower version of reality. If you miss, miss by a lot
- Critical decisions are hard to reverse - so try to avoid any
- Requirements, staff change faster than software develops. No decision is cast in stone and could change
- Forgo following fads
- How to make sure you hit a target - tracer bullet: immediate feedback under real conditions with moving goal
- Could specify the system to death, itemise every requirement and constraint - fire gun with one big calculation - bad solution target will have moved
- Find important requirements, areas with most doubts and priories there 
- First tracer bullet is just hello world
- Tracer code not disposable - contains structure, error checking c documenting like prod code - key point is once done, check if you are close to the target 
- Better than building each module piece by piece in a vacuum
- Users can see something early and say if doing it right 
- Devs build the structure to work in - makes more productive 
- Impact of new changes less, as integrations all done
- Easier to track progress
- Sometimes TB miss - but small body of code has less inertia easy to change
- Prototyping you throw away, experiment with, no error handling then recode - more about specific areas, TB about the whole application hanging together, skeleton (reconnaissance before bullet)

### Prototypes
- offer chance for correction at reduced cost and risk
- Doesn’t have to be code - drawings, UI builder
- Anything experimental/doubtful
- Value is in the lessons learned not the produced thing 
- Must be disposable and unable to complete it - wouldn’t drive a balsa wood car

### Estimating
- builds intuition on what is practical, to avoid surprises 
- Ask someone who’s done something similar 
- Understand what’s being asked - try to define the scope
- Build a model of the system - could even lead to alternative solutions 
- Break model into components that are easily understood easier to estimate 
- Use existing measurements as parameters eg network transit time
- Record estimates and compare with results 
- Project estimates - use incremental development (scouting the most risky components) then validate with users  - use the iteration to refine the estimate 
- Iterate the schedule with the code 
- Say - I’ll get back to you, don’t  give  on the spot (at the coffee machine)

## Chapter 7 - While you are Coding

### Listen to your lizard brain
- instincts trained or innate - feeing that you could ignore. Have to notice that it’s happening and then do something 
- If you’re finding it hard coding - could be brain trying to tell you the structure or design is wrong, or solving the wrong problem 
- Stop coding or thinking about it and step away - let ideas in brain percolate and bubble up - OR externalise the issue and talk it out with someone - expose different parts of your brain to the issue 
- Hard to start new thing - start off with prototyping, tell yourself you’ll throw it away - write “I’m prototyping” and it’s meant to fail. Comment in editor what you’re trying to do. An attempt to crystallise the concern in your brain as you do it. Then throw the code away when happy
- When reading existing code, jot down interesting patterns - why did they write it this way - see patterns they used.

### Programming by coincidence 
- need to be wary of drawing false conclusions - accidental luck and success - programming deliberately
- Bad if don’t know why the code is working in the first place and then build on top of it 
- Accidents of implementation - might look like it’s working, or condition you rely on is an accident, undocumented behaviour, additional calls could make code slower or add new bugs
- Close enough isn’t - eg time zone example assuming could just be off by 1 each time - was assumption vs understanding and handling correctly 
- Phantom patterns - eg Russian bald and hairy leaders. Errors that happen every 1000 times - prove it
- Accidents of context - do you assume other parts of the system are there? Relying on English speaking users, what relying on that isn’t guaranteed? Eg dir is writable, time of server is correct, network available 
- Implicit assumptions - eg testing data. Assumptions should be documented and shared - if not well established facts in org could be a big issue
- How to program deliberately - be aware of what you’re doing, can you explain the code to a junior programmer, understand why the code works, use w plan when coding (even drawn diagram), rely only in reliable things, document assumptions and test assumptions. 

### Algorithm Speed
- Estimate algorithm based on size of input - bigO notation
- Common sense of nesting loops, divide and conquer, combinatorics - think about size of inputs here (eg overnight batch run)

### Refactoring
- Rethinking earlier decisions - code needs to evolve, is not static 
- Building constructor is poor metaphors as building don’t change - is more like gardening - more organic.
- Some plants thrive, others die and need to be removed - some may overgrown and need pruned, or have more light or water - always monitoring the health and making adjustments
- Refactoring changes internal structure but keeps external behaviour 
- Not meant to be high ceremony once in a while - but constant day or day. Is targeted and precise to help keep code clean and easy to change 
- When? Refactor when learned something you didn’t know before (even 10mins ago). Code doesn’t quite fit, or something should be merged - don’t hesitate to change it! 
- Duplication, non-orthogonal, outdated knowledge, performance, usage (some features more/less important)
- Time pressure often used as excuse, but as time goes on problem will be bigger - refactor early and often (before it spreads)
- Don’t refactor and add functionality at the same time, use tests to verify behaviour, take short deliberate steps vs 1 massive change and test in between 

## Chapter 8
### Requirements Pit

- gathering requirement implies nuggets of wisdom lying around to be found - implies already there.
- In reality buried under assumptions and politics or don’t exist 
- No one knows what they want
- Our job is to help people understand what they want ie we are therapists 
- Mistake is to take the need and implement that solution - really it’s an invitation to explore more - asking annoying questions/edge cases
- Contributing to a better solution with the client 
- Requirements are a process - learned from a feedback loop (you generate loop, feed back to client)
- Is this what you meant? Mock-ups, prototypes, tracer bullets things that are flexible to change 
- Whole project is requirements loop - hence short product iterations that end with direct feedback
- Put yourself in clients shoes - become a client (eg CXT) - also builds trust 
- Document requirements only as milestones in process, can be used for planning (user stories)
-  Clients will never read the requirements - they don’t care about the details (that’s your job)
- Good requirements are abstract - reflect the business need 
- Prevent feature bloat with feedback  with client - if another story card goes up they pick one to come down
- Maintain glossary- for both end uses, staff client and developers - v accessible

### Solving impossible puzzles 
- Trying the same obvious thing over and over doesn’t work (eg those toys where you have to remove string from rope) - but we we keep trying it - the solution is elsewhere!
- Some constrains are preconceived notions vs absolute - find the box (don’t think outside it)
- Key to solving puzzles is recognise the constrains, and the degrees of freedom you DO have - solution is in there - you may dismiss potential solutions too quickly 
- Enumerate all possible avenues - don’t dismiss anything no matter how stupid. Then explain why each cannot be taken (can you prove it?)
- When really stuck - get out of your own way. Go for a walk, do something different, sleep on it 
- Try explaining it to someone else (they ask questions like why solving this, what’s the benefit, are issues related to edge cases, is there a simpler related problem you can solve)
- Don’t panic 

### Working together 
- mob programming on difficult things - other team members comment, ponder and solve problems 
- Involve users in development 
- Pair programming gives each developer more bandwidth (one low level, other high level - vs both at same time) - less inclined to do shortcuts 
- Mobs can include more than developers - eg biz experts while coding - tight collaboration
- Build the code not your ego, criticise the code not people - listen to the other, conduct frequent retrospectives 
- Don’t go into the code alone 

### Essence of Agility
- agile is not a how, it’s how you do things 
- Not good is agile-in-a-box, more formal, management, fancy job titles 
- Individuals and interactions over process and tools
- Working software > comprehensive documentation
- Customer collaboration vs contract negotiation 
- Respond to change over following a plan
- There is no agile process - as it’s about responding to change, unknown unknowns - decisions are contextual
- Work out where you are - make smallest meaningful step towards where you want to be - evaluate where you end up and fix anything you broke - use this recursively 
