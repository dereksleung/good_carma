export const TreeMethods = {
  spacer() {

  },
  drawSkeleton() {
    // Recursive?
    // Ability to sense how many levels deep -> Counter.
    // calls .size or JS equivalent (.length) at each level for initial estimate.
    // Gives enough room, a function of how much space the new branches need.
    // onHover/focus click handler shows a popover.
    // In Ruby, pg[:child_posts][0][:child_posts].size

    // How to set a variable it can use in the next iteration? Place outside the loop.
    // transform: "rotate(60deg)"

    // Background-image, or <img> tag? <img> tag could receive onClick event handler, but so can the <section> tag with a background-image. 
    // I want to make any leaves or fruit on top of the branch's <section> tag make a popover open for the leaves or fruit. 
    // The leaves and fruit need to have higher priority than the branch's <img> or <section> tag either way.
    // Either an <img> or <section> tag will work.
    // Background-image will blend easily with the other background-images. But I would rather have them solid.

    let currStyle = {
      position: "absolute",
      right: "50%",
      bottom: "0%",
      
      transform: "rotate(90deg)"
    }
  }
}