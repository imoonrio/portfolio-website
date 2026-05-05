# Personal Portfolio Website Design

## Goal

Build a bright, premium personal portfolio website focused on showing selected work. The site should feel editorial and refined, adapt well on mobile and desktop, and make artwork/images the primary visual signal. The first version will be a static, data-driven site: new works are added by placing image files in the project and updating a works data file.

## Chosen Direction

The visual direction is "magazine-style premium": generous white or warm-white background, strong typography, restrained color accents, and large featured project imagery. The homepage should establish personal identity quickly, then move directly into works.

## Audience

The site is for visitors who want to quickly understand the creator's taste, range, and recent work. The browsing experience should support scanning, comparing, and opening a project for more detail without burying the work behind marketing copy.

## Site Structure

- Header: name or personal brand, compact navigation links for Work, About, and Contact.
- Hero: editorial headline, short personal positioning text, and a featured work preview.
- Work gallery: filterable project grid with strong image presentation.
- Work detail: click a project to view larger imagery, category, year, description, and optional external link.
- About and contact: concise introduction and direct contact/social links.

## Content Model

Works are stored in a typed data file. Each work item includes:

- `id`: stable unique identifier.
- `title`: project name.
- `category`: category such as Design, Photography, Branding, UI, or Art.
- `year`: display year.
- `description`: short project summary.
- `image`: image path from the public assets folder.
- `featured`: whether it appears in the hero or featured section.
- `link`: optional external URL.

Images live under a public works folder so the owner can update the portfolio by adding images and editing the data file.

## Interaction Design

Gallery images should respond when hovered or focused. The interaction should feel polished rather than flashy:

- Image gently scales or shifts.
- Overlay text appears with title/category.
- Cursor movement may create a subtle lift or shadow.
- Keyboard focus states mirror hover affordances for accessibility.

Clicking a work opens a detail view without sending the visitor away. External project links are optional and clearly separated.

## Responsive Behavior

Desktop:

- Spacious editorial hero.
- Multi-column gallery with large image cards.
- Clear navigation and section rhythm.

Tablet:

- Reduced hero scale.
- Two-column gallery.
- Touch-friendly controls.

Mobile:

- Single-column or compact two-column gallery depending on available width.
- Header remains simple.
- Images keep stable aspect ratios.
- Text sizes remain readable and do not overlap image content.

## Architecture

Use a Vite + React + TypeScript static frontend. Recommended modules:

- `App`: page composition and selected work state.
- `components/Header`: site navigation.
- `components/Hero`: identity and featured work.
- `components/WorkGallery`: filters, grid, and card list.
- `components/WorkCard`: image card and hover/focus interaction.
- `components/WorkDetail`: modal or panel for project detail.
- `components/About`: short bio and contact links.
- `data/works`: typed portfolio content.

The site remains deployable as static files and can later be extended with a real upload backend if needed.

## Error And Empty States

Because the first version is static, runtime errors should be minimal. The gallery should still handle:

- No works matching a filter: show a concise empty state and a reset option.
- Missing optional link: omit the external link button.
- Image loading: use stable aspect ratios and tasteful background color to prevent layout shift.

## Testing And Verification

Before delivery:

- Run the project build.
- Start the local dev server.
- Verify desktop and mobile layouts in the browser.
- Check hover/focus interactions on work images.
- Confirm adding works is documented in the code or README.

## Out Of Scope For First Version

- Browser-based authenticated upload dashboard.
- Database, cloud storage, or login.
- Comments, likes, analytics, or payments.
- Multi-user content management.
