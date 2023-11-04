import subprocess
import openai

# Set your OpenAI GPT-3 API key
api_key = "Code_Narrator"
openai.api_key = "btB4sNkmII7MnFBLtjk9T3BlbkFJb7nkp5Llh7bZ0BoILoLM"

# Define the Python code you want to analyze
python_code = """
def add_numbers(a, b):
    return a + b
"""

# Step 1: Code Analysis with Pylint
def run_pylint(code):
    try:
        # Run Pylint on the code and capture the output
        output = subprocess.check_output(["pylint", "-"], input=code.encode(), text=True, stderr=subprocess.STDOUT)
        return output
    except subprocess.CalledProcessError as e:
        return e.output

# Step 2: Document the Code using GPT-3
def document_code_with_gpt3(code):
    try:
        # Define a query for GPT-3 to generate documentation
        query = f"Document the following Python code:\n\n{code}"
        
        # Use GPT-3 to generate documentation
        response = openai.Completion.create(
            engine="davinci",
            prompt=query,
            max_tokens=100
        )
        return response.choices[0].text
    except Exception as e:
        return str(e)

# Step 1: Analyze the code with Pylint
pylint_output = run_pylint(python_code)

# Step 2: Generate documentation using GPT-3
documentation = document_code_with_gpt3(python_code)

print("Pylint Output:")
print(pylint_output)

print("\nGenerated Documentation:")
print(documentation)
