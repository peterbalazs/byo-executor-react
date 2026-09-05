# byo-executor-react — RETIRED

> **This project is retired. It is not built, deployed or maintained, and it does not work against
> the current backend. It is kept only as a historical reference; do not add features to it and do
> not deploy it.**

## Why it was retired

This was an early prototype of an end-user ("executor") shell for the BYO platform. Three things
made it unsalvageable as a starting point:

1. **It targets an API that never existed.** It calls `GET /api/tables`,
   `GET /api/query/:tableName`, `POST /api/operations/:tableName`,
   `PUT /api/operations/:tableName/:id` and `DELETE /api/operations/:tableName/:id`, addressing rows
   by table *name* and numeric id, with flat string maps as payloads. The real service exposes
   `/tables`, `/operations/{tableUuid}/lines[/{lineId}]` and the form endpoints, addresses
   everything by UUID, and uses structured field-value payloads. None of the calls in this codebase
   reach a real endpoint.
2. **It has no authentication.** The deployed API is an OAuth2 resource server that requires a valid
   Authentik JWT carrying the `byo-admin` role on every non-actuator request. This prototype sends
   bare axios requests with no token.
3. **It has no tests and no typed contract.** Every input is rendered as free text, so none of the
   platform's type system — dates, times, booleans, value lists, files, references, lists — is
   expressible, and nothing would catch a drift from the API.

## What replaced it

**`byo-admin-react`**, which now covers everything this prototype attempted and considerably more,
against the real API, with OIDC/PKCE authentication, a generated typed client, and component tests:

| What this prototype tried to do | Where it lives now in `byo-admin-react` |
|---|---|
| List tables | `TablesListPage` (`/tables`) |
| Show a table's rows | `TableContent` (`/operations/:tableUuid`), paginated server-side |
| Configured listings with filters and sorting | `QueryFormExecutePage` (`/query-forms/:uuid/execute`) |
| Create a row | `AddFormSubmitPage` (`/add-forms/:uuid/submit`), plus the grid's inline insert |
| Read one record | `ViewFormRenderPage` (`/view-forms/:uuid/lines/:lineId`) — sections and a 12-column layout |
| Edit one record | `EditFormSubmitPage` (`/edit-forms/:uuid/lines/:lineId`) — prefilled, editability enforced |
| Delete a row | `TableContent`'s row actions |

The plan (`../ANALYSIS_AND_PLAN.md`, §3 and §6) records the decision to consolidate on one frontend
rather than maintain two, and Phase 5 is where the last capability this prototype had left —
record view and edit screens — landed in the admin SPA.

## Why the directory is still here

Deleted code is invisible; a retired directory with this note is not. It is kept so that the
prototype's UI ideas can still be read, and so the decision to retire it is discoverable from the
repository itself. If a dedicated end-user shell is ever wanted, it should be built fresh against
the current `openapi.yaml` — reusing the generated client and auth setup from `byo-admin-react` —
not resurrected from here.
