from tabulate import tabulate

headers = ["Feature", "Shopify's Default Gift Cards", "99minds Gift Card Program"]
data = [
    ["Customization Limitations", "Basic customization options, limited alignment with brand identity", 
     "Advanced customization for tailored branding and marketing strategies"],
    ["Advanced Marketing Tools", "Basic functionalities, lacks advanced promotional tools", 
     "Supports complex promotional strategies like gamified rewards"],
    ["Integration and Flexibility", "Limited flexibility, basic integration within Shopify's platform", 
     "High flexibility, seamless integration with other marketing tools, such as: Bigcommerce, Woocommerce, SquarePOS, etc."],
    ["Refund Options", "Allows gift cards as refunds but with limited management flexibility", 
     "More straightforward and flexible refund management"]
]

table = tabulate(data, headers, tablefmt="grid")

print(table)

