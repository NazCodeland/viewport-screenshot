# URL Screenshot Plugin

This application allows you to take screenshots of a website.

## Main features:

- To be able to take screenshots of given URL in different viewports.

## Nice to have features:

- Allow for different type of screenshots:
  -> grayscale,
  -> contrast colours,
  -> colors for different type of eyesight for individuals with different levels of eyesight

## UI Design

- UI should be adjustable horizontally and verticially like devtools
- UI should look like the devtools bar:

  - ![alt text](/images/bar.png)

- the applicaiton UI should resemble the devtools bar + options + more? or + less

  - ![alt text](/images/scene.png)

  - The ability to `throttle a network`, in a screenshot like app. or plugin, can represent screenshots of the diff. states of a websites load.
    - Linked to Lighthouse `loading times`, `rendering`
    - Essentially what browser already offers just diff. just needs to be reapplied to something new old invention applied to something new; new use case, new problem, etc.

- Figma plugin UI ideas:

  - the screenshot ability should be reachable via CTRL + P
  - it should be a bar at the top but it should
    - go invisible or,
    - becomes really small line, like -------- or,
    - but its hover area (opacity:0) will be great so as soon as you move mouse towards it, opacity:1 really low opacity so its transparent

- Additional UI ideas:

  - instead of having a huge list, maybe small checkboxes can represent additional dimensions,
    and as the person clicks on them they will be added to the list of dimensions.
  - also as they are clicked, they can rotate with the unclicked ones so the user doesn't need to scroll to select them all.
    They can just keep clicking the first checkbox location. - This can't be default behavior.
  - ![alt text](/images/image.png)

  - Another checkbox to select all the dimensions.
    ![alt text](/images/image-1.png)

  - They can scroll horizontally and veritically a 'scroller' that covers the area for the checkboxes
    that will be turned on at once when the `check all` checkbox is clicked.
    ![selecting the first 14 dimensions](/images/image-2.png)
    ![selecting only 3 dimensions](/images/image-3.png)
