def table_to_text(table_data):

    headers = table_data[0]
    rows = table_data[1:]

    output = []

    output.append("TABLE DATA\n")

    for idx, row in enumerate(rows, start=1):
        output.append(f"Row {idx}:\n")

        for header, value in zip(headers, row):
            clean_header = " ".join(header.split())
            clean_value = " ".join(value.split())
            output.append(f" {clean_header}: {clean_value}\n")

        output.append(" ")

    return "\n".join(output)    