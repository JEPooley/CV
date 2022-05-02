<script>
    // Imports
    import { skills } from "../data/skills.js";
    import Skill from "./Skill.svelte"
  </script>
  
  {#each skills as skill, i}
    <Skill
      name={skill.name}
      rating={skill.rating}
      delay={500 + i*100}
      >{skill.text}
    </Skill>
  {/each}
  