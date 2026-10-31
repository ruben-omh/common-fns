const HTML_SPECIAL = /[&<>"']/;
const HTML_SPECIAL_GLOBAL = /[&<>"']/g;
const HTML_ENTITIES: Readonly<Record<string, string>> = {
	"&": "&amp;",
	"<": "&lt;",
	">": "&gt;",
	'"': "&quot;",
	"'": "&#39;",
};

/**
 * Escapes `& < > " '` so `text` can be placed in HTML text content or in a QUOTED attribute
 * value. Not sufficient for unquoted attributes, URLs (`href`), `<script>` or CSS contexts.
 * Text with nothing to escape is returned as is, without allocating.
 *
 * @param text Text to escape.
 * @returns `text` with HTML-special characters replaced by entities.
 *
 * @example
 * escapeHtml('Tom & "Jerry" <br>'); // "Tom &amp; &quot;Jerry&quot; &lt;br&gt;"
 */
export function escapeHtml(text: string): string {
	if (!HTML_SPECIAL.test(text)) {
		return text;
	}
	return text.replaceAll(HTML_SPECIAL_GLOBAL, (character) => HTML_ENTITIES[character]);
}
