/**
 * Event Loop Demonstration
 * This function shows how JavaScript's event loop handles microtasks vs macrotasks.
 * 
 * Expected Console Output:
 * Step 1
 * Step 4
 * Step 3 (from Promise)
 * Step 2 (from setTimeout)
 */
export const EventLoopDemo = () => {
  console.log("Event Loop Demo: Step 1");

  setTimeout(() => {
    console.log("Event Loop Demo: Step 2 (timeout 5sec))");
  }, 5000);

  Promise.resolve().then(() => {
    console.log("Event Loop Demo: Step 3 (from Promise)");
  });

  console.log("Event Loop Demo: Step 4");
};
